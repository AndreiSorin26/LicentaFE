import {Dictionary, Routes} from "../../constants";
import {Table} from "../../components/ui/workspace-view/interfaces/table";

import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {CookieService} from "ngx-cookie-service";

@Injectable({
  providedIn: 'root'
})

export class TableService
{
    constructor(private http: HttpClient,
                private cookieService: CookieService)
    {}

    addTable(table: Table, handleOk?: () => void, handleError?: (error: HttpErrorResponse) => void)
    {
        const headers =
            {
                'Authorization': `${this.cookieService.get('token')}`
            }

        return this.http.post(Routes.TABLE.ADD_TABLE, table, {headers}).subscribe({
            next: () => handleOk && handleOk(),
            error: err => handleError && handleError(err)
        });
    }

    getUserTables(handleOk?: (response: Table[]) => void, handleError?: (error: HttpErrorResponse) => void)
    {
        const headers =
            {
                'Authorization': `${this.cookieService.get('token')}`
            }

        return this.http.get<Table[]>(Routes.TABLE.GET_USER_TABLES, {headers}).subscribe({
            next: response => handleOk && handleOk(response),
            error: err => handleError && handleError(err)
        });
    }

    insertIntoTable(table: Table, handleOk?: () => void, handleError?: (error: HttpErrorResponse) => void)
    {
        const headers =
            {
                'Authorization': `${this.cookieService.get('token')}`
            }

        return this.http.post(Routes.TABLE.INSERT_INTO_TABLE, table, {headers}).subscribe({
            next: () => handleOk && handleOk(),
            error: err => handleError && handleError(err)
        });
    }

    queryTable(query: string, model: string, handleOk?: (response: Dictionary) => void, handleError?: (error: HttpErrorResponse) => void)
    {
        const headers =
            {
                'Authorization': `${this.cookieService.get('token')}`
            }

        return this.http.post<Dictionary>(Routes.TABLE.QUERY_TABLE, {query, model}, {headers}).subscribe({
            next: response => handleOk && handleOk(response),
            error: err => handleError && handleError(err)
        })
    }
}
