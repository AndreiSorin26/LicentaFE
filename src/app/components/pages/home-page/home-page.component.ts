import { Component } from '@angular/core';
import {
    NzContentComponent,
    NzFooterComponent,
    NzHeaderComponent,
    NzLayoutComponent,
    NzSiderComponent
} from "ng-zorro-antd/layout";
import {NzMenuDirective, NzMenuItemComponent} from "ng-zorro-antd/menu";
import {NzIconDirective} from "ng-zorro-antd/icon";
import {WorkspaceViewComponent} from "../../ui/workspace-view/workspace-view.component";
import {NzBreadCrumbComponent, NzBreadCrumbItemComponent} from "ng-zorro-antd/breadcrumb";
import {TableViewComponent} from "../../ui/table-view/table-view.component";
import {Table} from "../../ui/workspace-view/interfaces/table";
import {NzButtonComponent} from "ng-zorro-antd/button";
import {ta_IN} from "ng-zorro-antd/i18n";
import {PromptExamplesViewComponent} from "../../ui/prompt-examples-view/prompt-examples-view.component";

@Component({
    selector: 'app-home-page',
    standalone: true,
    imports: [
        NzLayoutComponent,
        NzSiderComponent,
        NzMenuDirective,
        NzMenuItemComponent,
        NzIconDirective,
        NzHeaderComponent,
        NzContentComponent,
        NzFooterComponent,
        WorkspaceViewComponent,
        NzBreadCrumbComponent,
        NzBreadCrumbItemComponent,
        TableViewComponent,
        NzButtonComponent,
        PromptExamplesViewComponent
    ],
    templateUrl: './home-page.component.html',
    styleUrl: './home-page.component.css'
})

export class HomePageComponent
{
    location: string[] = ['My Workspace'];

    selectedTable?: Table;

    getCurrentLocation(): string | undefined
    {
        if(this.location.length == 1)
            return this.location[0]
        if(this.location.length > 1 && this.location[0] == 'My Workspace')
            return 'Table'
        return undefined
    }

    selectTable(table: Table)
    {
        this.location.push(table.name)
        this.selectedTable = table
    }

    dropLocation(index: number)
    {
        this.location = this.location.slice(0, index + 1)
    }

    protected readonly ta_IN = ta_IN;
}
