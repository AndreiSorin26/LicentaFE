import {Table} from "./interfaces/table";

import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ToolbarModule} from "primeng/toolbar";
import {ButtonModule} from "primeng/button";
import {InputTextModule} from "primeng/inputtext";
import {SplitButtonModule} from "primeng/splitbutton";
import {NzButtonComponent} from "ng-zorro-antd/button";
import {NzIconDirective} from "ng-zorro-antd/icon";
import {NzTooltipDirective} from "ng-zorro-antd/tooltip";
import {NzCardComponent} from "ng-zorro-antd/card";
import {NzListComponent, NzListEmptyComponent, NzListItemComponent} from "ng-zorro-antd/list";
import {NzColDirective, NzRowDirective} from "ng-zorro-antd/grid";
import {NzPopconfirmDirective} from "ng-zorro-antd/popconfirm";
import {AddTableModalComponent} from "./add-table-modal/add-table-modal.component";
import {TableService} from "../../../services/table/table.service";
import {NzMessageService} from "ng-zorro-antd/message";

@Component({
  selector: 'app-workspace-view',
  standalone: true,
    imports: [
        ToolbarModule,
        ButtonModule,
        InputTextModule,
        SplitButtonModule,
        NzButtonComponent,
        NzIconDirective,
        NzTooltipDirective,
        NzCardComponent,
        NzListComponent,
        NzRowDirective,
        NzColDirective,
        NzListItemComponent,
        NzListEmptyComponent,
        NzPopconfirmDirective,
        AddTableModalComponent
    ],
  templateUrl: './workspace-view.component.html',
  styleUrl: './workspace-view.component.css'
})

export class WorkspaceViewComponent implements OnInit
{
    @Output() tableSelected: EventEmitter<Table> = new EventEmitter<Table>()

    fetchingTables: boolean = false
    tables: Table[] = []

    addTableModalVisible: boolean = false

    constructor(private tableService: TableService,
                private messageService: NzMessageService)
    {}

    ngOnInit(): void
    {
        this.fetchTables()
    }

    fetchTables(): void
    {
        this.fetchingTables = true
        this.tableService.getUserTables((tables) => {
            this.tables = tables
            this.fetchingTables = false
        }, (error) => {
            this.messageService.error('Failed to fetch tables: ' + error.message)
            this.fetchingTables = false
        })
    }

    dropTable(table: Table): void
    {
        this.tables = this.tables.filter(t => t !== table)
    }

    openAddTable()
    {
        this.addTableModalVisible = true
    }

    addTable(table: Table): void
    {
        this.tableService.addTable(table, () => {
            this.addTableModalVisible = false
            this.fetchTables()
        }, (error) => {
            this.messageService.error('Failed to add table: ' + error.message)
            this.addTableModalVisible = false
        })
    }

    cancelAddTable(): void
    {
        this.addTableModalVisible = false
    }

    selectTable(table: Table): void
    {
        this.tableSelected.emit(table)
    }
}
