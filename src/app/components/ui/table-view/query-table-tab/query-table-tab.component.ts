import { Component } from '@angular/core';
import {NzInputDirective, NzInputGroupComponent} from "ng-zorro-antd/input";
import {NzButtonComponent} from "ng-zorro-antd/button";
import {NzIconDirective} from "ng-zorro-antd/icon";
import {FormsModule} from "@angular/forms";
import {TableService} from "../../../../services/table/table.service";
import {NzMessageService} from "ng-zorro-antd/message";
import { Dictionary } from '../../../../constants';
import {NzOptionComponent, NzSelectComponent} from "ng-zorro-antd/select";
import {NzDividerComponent} from "ng-zorro-antd/divider";

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
        NzDividerComponent
    ],
  templateUrl: './query-table-tab.component.html',
  styleUrl: './query-table-tab.component.css'
})
export class QueryTableTabComponent
{
    queryText: string = '';
    model: string = 'My Chat';
    result: Dictionary = {};

    constructor(private tableService: TableService,
                private messageService: NzMessageService)
    {}

    sendQuery()
    {
        this.tableService.queryTable(this.queryText, this.model, response => {
            this.result = response
        }, error => {
            this.messageService.error('Error querying table: ' + error.message)
        })
    }
}
