import {Routes} from "../../constants";
import {SuccessRateResponse} from "./interfaces/success-rate";

import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {CookieService} from "ngx-cookie-service";

@Injectable({
  providedIn: 'root'
})
export class StatisticsService {

    constructor(private http: HttpClient,
                private cookieService: CookieService)
    {}

    public getSuccessRate(handleOk?: (response: SuccessRateResponse) => void, handleError?: (error: HttpErrorResponse) => void)
    {
        const headers =
            {
                'Authorization': `${this.cookieService.get('token')}`
            }

        this.http.get<SuccessRateResponse>(Routes.HISTORY.SUCCESS_RATE, {headers: headers}).subscribe({
            next: (response: SuccessRateResponse) => handleOk && handleOk(response),
            error: err => handleError && handleError(err)
        })
    }
}
