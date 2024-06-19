import {StatisticsService} from "../../../services/statistics/statistics.service";

import {Component, OnInit} from '@angular/core';
import {NzMessageService} from "ng-zorro-antd/message";
import {SuccessRate} from "../../../services/statistics/interfaces/success-rate";
import {ChartModule} from "primeng/chart";
import {NzDividerComponent} from "ng-zorro-antd/divider";
import {NzTableComponent} from "ng-zorro-antd/table";
import {LlmHistory} from "../../../services/statistics/interfaces/llm-history";
import {NzTagComponent} from "ng-zorro-antd/tag";
import {NzEmptyComponent} from "ng-zorro-antd/empty";
import {NzButtonComponent} from "ng-zorro-antd/button";

@Component({
  selector: 'app-statistics-view',
  standalone: true,
    imports: [
        ChartModule,
        NzDividerComponent,
        NzTableComponent,
        NzTagComponent,
        NzEmptyComponent,
        NzButtonComponent
    ],
  templateUrl: './statistics-view.component.html',
  styleUrl: './statistics-view.component.css'
})

export class StatisticsViewComponent implements OnInit
{
    loadingSuccessRate: boolean = false
    data: any
    options: any

    loadingLlmHistory: boolean = false
    llmHistory?: LlmHistory
    offset: number = 0
    rows: number = 2

    constructor(private statisticsService: StatisticsService,
                private messageService: NzMessageService)
    {}

    ngOnInit()
    {
        this.offset = 0
        this.loadingSuccessRate = true
        this.loadSuccessRate()
        this.loadLlmHistory()
    }

    parseData(successRates: SuccessRate[])
    {
        const documentStyle = getComputedStyle(document.documentElement);

        this.data = {
            labels: successRates.map((successRate) => successRate.modelName),
            datasets: [
                {
                    type: 'bar',
                    label: 'Hits',
                    backgroundColor: documentStyle.getPropertyValue('--green-500'),
                    data: successRates.map((successRate) => successRate.hits)
                },
                {
                    type: 'bar',
                    label: 'Misses',
                    backgroundColor: documentStyle.getPropertyValue('--red-500'),
                    data: successRates.map((successRate) => successRate.misses)
                }
            ]
        };
    }

    parseOptions()
    {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
        this.options = {
            maintainAspectRatio: false,
            aspectRatio: 0.8,
            plugins: {
                tooltip: {
                    mode: 'index',
                    intersect: false
                },
                legend: {
                    labels: {
                        color: textColor
                    }
                }
            },
            scales: {
                x: {
                    stacked: true,
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false
                    }
                },
                y: {
                    stacked: true,
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false
                    }
                }
            }
        };
    }

    loadSuccessRate()
    {
        this.statisticsService.getSuccessRate((response) => {
            this.parseOptions()
            this.parseData(response.modelSuccessDtoList)
            this.loadingSuccessRate = false
        }, (error) => {
            this.loadingSuccessRate = false
            this.messageService.error("Failed to load success rates: " + error.message)
        })
    }

    loadLlmHistory()
    {
        this.loadingLlmHistory = true
        this.statisticsService.getLlmHistory(this.offset, this.rows, (response) => {
            if(this.offset == 0)
                this.llmHistory = response
            else
            {
                if(response.content.length ==0)
                    this.messageService.success("No more LLM history to load")
                else
                    this.llmHistory!.content.push(...response.content)
            }

            this.offset += 1
            this.loadingLlmHistory = false
        }, (error) => {
            this.loadingLlmHistory = false
            this.messageService.error("Failed to load LLM history: " + error.message)
        })
    }
}
