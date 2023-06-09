import { Component } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { AuthenticationInterceptor } from "../authentication.interceptor";

@Component({
    selector: 'app-nav-bar',
    templateUrl: './nav-bar.component.html',
    styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {

    constructor(
        private http: HttpClient,
        private router: Router
    ) {}


    logout() {
        this.http.post('http://localhost:8080/player/logout', {})
            .subscribe(() => {
                AuthenticationInterceptor.token = undefined;
                this.router.navigate(['/player/sign-in']).catch(console.error);
            });
    }
}