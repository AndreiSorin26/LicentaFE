import {StatisticsService} from "../../../services/statistics/statistics.service";

import {Component, OnInit} from '@angular/core';
import {NzMessageService} from "ng-zorro-antd/message";
import {SuccessRate} from "../../../services/statistics/interfaces/success-rate";
import {ChartModule} from "primeng/chart";

@Component({
  selector: 'app-statistics-view',
  standalone: true,
    imports: [
        ChartModule
    ],
  templateUrl: './statistics-view.component.html',
  styleUrl: './statistics-view.component.css'
})

export class StatisticsViewComponent implements OnInit
{
    loadingSuccessRate: boolean = false
    data: any
    options: any

    constructor(private statisticsService: StatisticsService,
                private messageService: NzMessageService)
    {}

    ngOnInit()
    {
        this.loadingSuccessRate = true
        this.statisticsService.getSuccessRate((response) => {
            this.parseOptions()
            this.parseData(response.modelSuccessDtoList)
            this.loadingSuccessRate = false
        }, (error) => {
            this.loadingSuccessRate = false
            this.messageService.error("Failed to load success rates: " + error.message)
        })
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

}
