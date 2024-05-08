import { Component, Input } from '@angular/core';
import {NzInputDirective, NzInputGroupComponent} from "ng-zorro-antd/input";
import {NzButtonComponent} from "ng-zorro-antd/button";
import {NzIconDirective} from "ng-zorro-antd/icon";
import {FormsModule} from "@angular/forms";
import {TableService} from "../../../../services/table/table.service";
import {NzMessageService} from "ng-zorro-antd/message";
import {NzOptionComponent, NzSelectComponent} from "ng-zorro-antd/select";
import {NzDividerComponent} from "ng-zorro-antd/divider";
import {Table} from "../../workspace-view/interfaces/table";
import {NzSpinComponent} from "ng-zorro-antd/spin";
import {NzFlexDirective} from "ng-zorro-antd/flex";
import {NzPopoverDirective} from "ng-zorro-antd/popover";
import {RunQueryResponse} from "../../../../services/table/interfaces/run-query-response";

@Component({
    selector: 'app-query-table-tab',
    standalone: true,
    imports: [
        NzInputGroupComponent,
        NzInputDirective,
        NzButtonComponent,
        NzIconDirective,
        FormsModule,
        NzSelectComponent,
        NzOptionComponent,
        NzDividerComponent,
        NzSpinComponent,
        NzFlexDirective,
        NzPopoverDirective
    ],
    templateUrl: './query-table-tab.component.html',
    styleUrl: './query-table-tab.component.css'
})

export class QueryTableTabComponent
{
    @Input() table?: Table

    queryText: string = ''
    model: string = 'My Chat'

    querying: boolean = false
    result?: string

    runningQuery: boolean = false
    tableResult?: RunQueryResponse

    constructor(private tableService: TableService,
                private messageService: NzMessageService)
    {}

    sendQuery()
    {
        this.querying = true
        this.tableResult = undefined
        this.tableService.queryTable(this.queryText, this.table!.name, this.model, response => {
            this.result = response
            this.querying = false
        }, error => {
            this.messageService.error('Error querying table: ' + error.message)
            this.querying = false
        })
    }

    runQuery()
    {
        if(!this.result)
            return;

        this.runningQuery = true;
        this.tableService.runQuery(this.result, response => {
            this.runningQuery = false
            this.tableResult = response
        }, error => {
            if(error.status / 100 == 4)
                this.messageService.error("Query resulted in error: " + error.message)
            else
                this.messageService.error("Serverside error: " + error.message)

            this.runningQuery = false
        })
    }
}
