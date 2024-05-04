import {Table, TableColumn, ValueType} from "../../workspace-view/interfaces/table";
import {Dictionary} from "../../../../constants";
import {TableService} from "../../../../services/table/table.service";

import {Component, Input, OnInit} from '@angular/core';
import {NzTableComponent, NzThMeasureDirective} from "ng-zorro-antd/table";
import {NzInputDirective} from "ng-zorro-antd/input";
import {FormsModule} from "@angular/forms";
import {NzPopconfirmDirective} from "ng-zorro-antd/popconfirm";
import {NzButtonComponent} from "ng-zorro-antd/button";
import {NzIconDirective} from "ng-zorro-antd/icon";
import {NzTooltipDirective} from "ng-zorro-antd/tooltip";
import {NzDividerComponent} from "ng-zorro-antd/divider";
import {DatePipe} from "@angular/common";
import {NzMessageService} from "ng-zorro-antd/message";
import {NzSpinComponent} from "ng-zorro-antd/spin";
import {NzRadioComponent, NzRadioGroupComponent} from "ng-zorro-antd/radio";
import {NgxCsvParser, NgxCSVParserError, NgxCsvParserModule} from "ngx-csv-parser";
import {NzProgressComponent} from "ng-zorro-antd/progress";

@Component({
  selector: 'app-add-items-tab',
  standalone: true,
    imports: [
        NzTableComponent,
        NzThMeasureDirective,
        NzInputDirective,
        FormsModule,
        NzPopconfirmDirective,
        NzButtonComponent,
        NzIconDirective,
        NzTooltipDirective,
        NzDividerComponent,
        DatePipe,
        NzSpinComponent,
        NzRadioGroupComponent,
        NzRadioComponent,
        NgxCsvParserModule,
        NzProgressComponent
    ],
  templateUrl: './add-items-tab.component.html',
  styleUrl: './add-items-tab.component.css'
})

export class AddItemsTabComponent implements OnInit
{
    protected readonly ValueType = ValueType;

    @Input() table?: Table

    editCache: {[key: number]: {edit: boolean, data: Dictionary}} = {}
    sendingRows: boolean = false

    processingCSV: boolean = false
    sendingFileRows: boolean = false
    fileRowsUploadProgress: number = 0
    fileRowsUploadStatus: "success" | "exception" | "active" | "normal" | undefined = 'active'

    insertType: string = 'Manually'

    constructor(private tableService: TableService,
                private messageService: NzMessageService,
                private ngxCsvParser: NgxCsvParser)
    {}

    ngOnInit(): void
    {
        if(!this.table)
            return;

        if(!this.table.rows)
            this.table.rows = []

        this.table.rows.forEach( (row, index) => this.editCache[index] = {edit: false, data: row})
    }

    addNewRow()
    {
        const newRow: Dictionary = {}
        for(let column of this.table!.columns)
        {
            if(column.type === ValueType.FLOAT || column.type === ValueType.INTEGER)
                newRow[column.name] = 0
            else if(column.type === ValueType.DATE)
                newRow[column.name] = new Date()
            else
                newRow[column.name] = "Empty"
        }

        this.table!.rows!.push(newRow)
        this.editCache[this.table!.rows!.length - 1] = {edit: false, data: newRow}
    }

    startEdit(index: number)
    {
        this.editCache[index].edit = true
    }

    saveEdit(index: number)
    {
        this.editCache[index].edit = false
        this.table!.rows![index] = {...this.editCache[index].data}
        console.log(this.table)
    }

    cancelEdit(index: number)
    {
        this.editCache[index].edit = false
        this.editCache[index].data = {...this.table!.rows![index]}
    }

    getInputType(column: TableColumn)
    {
        if(column.type === ValueType.FLOAT || column.type ===  ValueType.INTEGER)
            return 'number'
        else if(column.type == ValueType.DATE)
            return 'date'
        return 'text'
    }

    deleteRow(index: number)
    {
        this.table!.rows!.splice(index, 1)
        delete this.editCache[index]
    }

    sendRows()
    {
        this.sendingRows = true
        this.tableService.insertIntoTable(this.table!, () => {
            this.messageService.success('Rows inserted successfully')
            this.table!.rows = []
            this.editCache = {}
            this.sendingRows = false
        }, (error) => {
            this.messageService.error('Failed to insert rows: ' + error.message)
            this.sendingRows = false
        })
    }

    uploadCSV(event: any)
    {
        const csvFile = event.target.files[0]

        this.processingCSV = true
        this.ngxCsvParser.parse(csvFile, { header: true, delimiter: ',', encoding: 'utf8' }).pipe().subscribe({
            next: (result): void =>
            {
                this.processingCSV = false
                this.sendFileRows(result as Dictionary[])
            },
            error: (error: NgxCSVParserError): void =>
            {
                this.processingCSV = false
                this.messageService.error('Failed to parse CSV file: ' + error.message)
            }
        });
    }

    sendFileRows(rows: Dictionary[])
    {
        this.sendingFileRows = true
        this.fileRowsUploadProgress = 0
        this.fileRowsUploadStatus = 'active'

        const batchSize = 100
        const progressStep = 100 / Math.ceil(rows.length / batchSize)
        const requests = []

        for(let index = 0; index < rows.length; index += batchSize)
        {
            const table =
                {
                    name: this.table!.name,
                    columns: this.table!.columns,
                    rows: rows.slice(index, index + batchSize)
                }

            requests.push(new Promise((resolve, reject) => {
                this.tableService.insertIntoTable(table, () => {
                    this.fileRowsUploadProgress += progressStep
                    resolve('ok')
                }, (error) => {
                    reject(error)
                })
            }))
        }

        Promise.all(requests).then((results) => {
            this.fileRowsUploadStatus = 'success'
            this.messageService.success('Rows inserted successfully')
            setTimeout(() => this.closeProgressBar(), 2000);
        }).catch((error) => {
            this.fileRowsUploadStatus = 'exception'
            this.messageService.error('Failed to insert rows: ' + error.message)
            setTimeout(() => this.closeProgressBar(), 2000);
        })
    }

    closeProgressBar()
    {
        this.sendingFileRows = false
    }
}
