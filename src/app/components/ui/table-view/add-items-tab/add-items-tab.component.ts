import {Table, TableColumn, ValueType} from "../../workspace-view/interfaces/table";

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
import {Dictionary} from "../../../../constants";
import {TableService} from "../../../../services/table/table.service";
import {NzMessageService} from "ng-zorro-antd/message";

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
        DatePipe
    ],
  templateUrl: './add-items-tab.component.html',
  styleUrl: './add-items-tab.component.css'
})

export class AddItemsTabComponent implements OnInit
{
    protected readonly ValueType = ValueType;

    @Input() table?: Table

    editCache: {[key: number]: {edit: boolean, data: Dictionary}} = {}
    sendingRows = false

    constructor(private tableService: TableService,
                private messageService: NzMessageService)
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
}
