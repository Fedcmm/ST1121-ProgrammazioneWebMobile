import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {CommonModule} from '@angular/common';

import {PageNotFoundComponent} from "./page-not-found/page-not-found.component";
import {SignupComponent} from "./sign-up/signup.component";
import {SignInComponent} from "./sign-in/sign-in.component";

const routes: Routes = [
    {
        path: '',
        redirectTo: '/signup',
        pathMatch: 'full'
    },
    {
        path: 'signup',
        component: SignupComponent
    },
    {
        path: 'signin',
        component: SignInComponent
    },
    {
        path: '**',
        component: PageNotFoundComponent
    }
];

@NgModule({
    declarations: [],
    imports: [
        CommonModule
    ]
})
export class AppRoutingModule {
}
