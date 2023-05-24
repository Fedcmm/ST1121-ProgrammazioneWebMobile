import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from "@angular/common/http";
import { FormsModule } from "@angular/forms";

import { AppComponent } from './app.component';
import { SignupComponent } from './sign-up/signup.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import {RouterOutlet} from "@angular/router";
import { SignInComponent } from './sign-in/sign-in.component';

@NgModule({
    declarations: [
        AppComponent,
        SignupComponent,
        PageNotFoundComponent,
        SignInComponent
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        FormsModule,
        NgbModule,
        AppRoutingModule,
        RouterOutlet
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
