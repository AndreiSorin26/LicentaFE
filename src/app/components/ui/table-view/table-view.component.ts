import {Component, Input} from '@angular/core';
import {NzTabComponent, NzTabSetComponent} from "ng-zorro-antd/tabs";
import {NzIconDirective} from "ng-zorro-antd/icon";
import {AddItemsTabComponent} from "./add-items-tab/add-items-tab.component";
import {QueryTableTabComponent} from "./query-table-tab/query-table-tab.component";
import {Table} from "../workspace-view/interfaces/table";

@Component({
  selector: 'app-table-view',
  standalone: true,
    imports: [
        NzTabSetComponent,
        NzTabComponent,
        NzIconDirective,
        AddItemsTabComponent,
        QueryTableTabComponent
    ],
  templateUrl: './table-view.component.html',
  styleUrl: './table-view.component.css'
})

export class TableViewComponent
{
    @Input() table?: Table

    tabs =
        [
            {
                title: 'Add Items',
                icon: 'plus-circle',
                component: 'add-items-tab'
            },
            {
                title: 'Query Table',
                icon: 'search',
                component: 'query-table-tab'
            }
        ]
}
