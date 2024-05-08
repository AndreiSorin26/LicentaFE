import {Routes} from "../../constants";
import {LoginResponse} from "./interfaces/login-response";
import {LoginRequest} from "./interfaces/login-request";
import {RegisterRequest} from "./interfaces/register-request";

import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {CookieService} from "ngx-cookie-service";

@Injectable({
  providedIn: 'root'
})

export class AuthService
{
    constructor(private http: HttpClient,
                private cookieService: CookieService)
    {}

    login(loginRequest: LoginRequest, handleOk?: (response: LoginResponse) => void, handleError?: (error: HttpErrorResponse) => void)
    {
        return this.http.post<LoginResponse>(Routes.AUTH.LOGIN, loginRequest).subscribe({
            next: response => handleOk && handleOk(response),
            error: err => handleError && handleError(err)
        })
    }

    register(registerRequest: RegisterRequest, handleOk?: (response: string) => void, handleError?: (error: HttpErrorResponse) => void)
    {
        return this.http.post(Routes.AUTH.REGISTER, registerRequest, {responseType: "text"}).subscribe({
            next: response => handleOk && handleOk(response),
            error: err => handleError && handleError(err)
        })
    }

    checkToken(handleOk?: (email: string) => void, handleError?: () => void)
    {
        const headers =
            {
                'Authorization': `${this.cookieService.get('token')}`
            }

        return this.http.get(Routes.AUTH.TOKEN, {headers, responseType: "text"}).subscribe({
            next: email => handleOk && handleOk(email),
            error: () => handleError && handleError()
        })
    }
}
