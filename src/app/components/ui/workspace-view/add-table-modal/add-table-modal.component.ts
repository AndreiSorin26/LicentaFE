import {Table, TableColumn, ValueType} from "../interfaces/table";

import {Component, EventEmitter, Input, Output} from '@angular/core';
import {NzModalComponent, NzModalContentDirective, NzModalService} from "ng-zorro-antd/modal";
import {NzInputDirective, NzInputGroupComponent} from "ng-zorro-antd/input";
import {FormsModule} from "@angular/forms";
import {NzDividerComponent} from "ng-zorro-antd/divider";
import {NzButtonComponent} from "ng-zorro-antd/button";
import {NzIconDirective} from "ng-zorro-antd/icon";
import {NzTooltipDirective} from "ng-zorro-antd/tooltip";
import {NzOptionComponent, NzSelectComponent} from "ng-zorro-antd/select";

@Component({
    selector: 'app-add-table-modal',
    standalone: true,
    imports: [
        NzModalComponent,
        NzModalContentDirective,
        NzInputDirective,
        FormsModule,
        NzDividerComponent,
        NzButtonComponent,
        NzIconDirective,
        NzTooltipDirective,
        NzInputGroupComponent,
        NzSelectComponent,
        NzOptionComponent
    ],
    providers: [NzModalService],
    templateUrl: './add-table-modal.component.html',
    styleUrl: './add-table-modal.component.css'
})

export class AddTableModalComponent
{
    protected readonly Object: ObjectConstructor = Object
    protected readonly ValueType: typeof ValueType = ValueType

    @Input() isVisible: boolean = false
    @Output() isVisibleChange: EventEmitter<boolean> = new EventEmitter()

    @Output("handleOk") handleOkEmitter: EventEmitter<Table> = new EventEmitter()
    @Output("handleCancel") handleCancelEmitter: EventEmitter<void> = new EventEmitter()


    table: Table = {name: '', columns: []}

    addNewColumn()
    {
        const newColumn: TableColumn = {name: '', type: ValueType.STRING}
        this.table.columns.push(newColumn)
    }

    handleOK(): void
    {
        this.handleOkEmitter.emit(this.table)
        this.isVisibleChange.emit(false)

        this.resetTable()
    }

    handleCancel(): void
    {
        this.handleCancelEmitter.emit()
        this.isVisibleChange.emit(false)

        this.resetTable()
    }

    resetTable()
    {
        this.table = {name: '', columns: []}
    }

    deleteColumn(column: TableColumn)
    {
        this.table.columns = this.table.columns.filter(c => c !== column)
    }
}
