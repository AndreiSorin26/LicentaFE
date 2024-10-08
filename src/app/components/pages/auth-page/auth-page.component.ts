import {AuthService} from "../../../services/auth/auth.service";
import {LoginRequest} from "../../../services/auth/interfaces/login-request";
import {LoginResponse} from "../../../services/auth/interfaces/login-response";
import {RegisterRequest} from "../../../services/auth/interfaces/register-request";

import {Component, OnInit} from '@angular/core';
import {NzFlexDirective} from "ng-zorro-antd/flex";
import {NzButtonComponent} from "ng-zorro-antd/button";
import {NzFormControlComponent, NzFormDirective, NzFormItemComponent} from "ng-zorro-antd/form";
import {
    FormControl,
    FormGroup,
    NonNullableFormBuilder,
    ReactiveFormsModule,
    Validators
} from "@angular/forms";
import {NzInputDirective, NzInputGroupComponent} from "ng-zorro-antd/input";
import {NzColDirective, NzRowDirective} from "ng-zorro-antd/grid";
import {NzCheckboxComponent} from "ng-zorro-antd/checkbox";
import {NgTemplateOutlet} from "@angular/common";
import {NzDividerComponent} from "ng-zorro-antd/divider";
import {NzMessageService} from "ng-zorro-antd/message";
import {HttpErrorResponse} from "@angular/common/http";
import {CookieService} from "ngx-cookie-service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-auth-page',
  standalone: true,
    imports: [
        NzFlexDirective,
        NzButtonComponent,
        NzFormDirective,
        ReactiveFormsModule,
        NzFormItemComponent,
        NzFormControlComponent,
        NzInputGroupComponent,
        NzInputDirective,
        NzRowDirective,
        NzColDirective,
        NzCheckboxComponent,
        NgTemplateOutlet,
        NzDividerComponent
    ],
  templateUrl: './auth-page.component.html',
  styleUrl: './auth-page.component.css'
})

export class AuthPageComponent implements OnInit
{
    showLoginForm: boolean = true

    validateRegisterForm: FormGroup<{
        email: FormControl<string>;
        password: FormControl<string>;
    }> = this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(8)]]
    })

    validateLoginForm: FormGroup<{
        email: FormControl<string>;
        password: FormControl<string>;
        remember: FormControl<boolean>;
    }> = this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required]],
        remember: [true]
    })

    constructor(private fb: NonNullableFormBuilder,
                private authService: AuthService,
                private message: NzMessageService,
                private cookieService: CookieService,
                private router: Router)
    {}

    ngOnInit()
    {
        this.authService.checkToken(() => {
            this.router.navigate(['/home']).then()
        })
    }

    login(): void
    {
        if (this.validateLoginForm.valid)
        {
            const loginRequest = this.validateLoginForm.value as LoginRequest
            this.authService.login(loginRequest, (response: LoginResponse) => {
                this.cookieService.set('token', `${response.token_type} ${response.access_token}`)
                this.router.navigate(['/home']).then()
            },
            (error: HttpErrorResponse) => {
                if(error.status === 403)
                    this.message.error('Invalid credentials')
                else
                    this.message.error(error.message)
            })
        }
        else
        {
            Object.values(this.validateLoginForm.controls).forEach(control =>
            {
                if (control.invalid)
                {
                    control.markAsDirty();
                    control.updateValueAndValidity({ onlySelf: true });
                }
            });
        }
    }

    register(): void
    {
        if (this.validateRegisterForm.valid)
        {
            const registerRequest = this.validateRegisterForm.value as RegisterRequest
            registerRequest.username = 'John Doe'
            this.authService.register(registerRequest, () => {
                    this.message.success('Registered successfully')
                    this.showLoginForm = true
                },
                (error: HttpErrorResponse) => {
                    this.message.error(error.message)
                })
        }
        else
        {
            Object.values(this.validateRegisterForm.controls).forEach(control =>
            {
                if (control.invalid)
                {
                    control.markAsDirty();
                    control.updateValueAndValidity({ onlySelf: true });
                }
            });
        }
    }

    submitForm(isLogin: boolean): void
    {
        if (isLogin)
            this.login();
        else
            this.register();
    }
}
