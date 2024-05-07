import {Routes} from "../../constants";
import {LoginResponse} from "./interfaces/login-response";
import {LoginRequest} from "./interfaces/login-request";
import {RegisterRequest} from "./interfaces/register-request";

import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})

export class AuthService
{
    constructor(private http: HttpClient)
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
}
