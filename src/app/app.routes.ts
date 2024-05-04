import {AuthPageComponent} from "./components/pages/auth-page/auth-page.component";
import {HomePageComponent} from "./components/pages/home-page/home-page.component";

import {Routes} from '@angular/router';

export const routes: Routes =
    [
        {path: '', redirectTo: 'auth', pathMatch: 'full'},
        {path: 'auth', component: AuthPageComponent},
        {path: 'home', component: HomePageComponent}
    ];
