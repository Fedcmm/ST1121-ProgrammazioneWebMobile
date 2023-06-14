import { Component } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { AuthenticationInterceptor } from "src/app/util/authentication.interceptor";
import { Player } from "src/model/Player";

@Component({
    selector: 'app-nav-bar',
    templateUrl: './nav-bar.component.html',
    styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {

    username = AuthenticationInterceptor.user?.username ?? '';
    afterLogoutRoute = AuthenticationInterceptor.user instanceof Player ? '/player/sign-in' : '/game-room/sign-in';


    constructor(
        private http: HttpClient,
        private router: Router
    ) {}


    logout() {
        let urlUserPart = AuthenticationInterceptor.user instanceof Player ? 'player' : 'game-room';

        this.http.post(`http://localhost:8080/${urlUserPart}/logout`, {})
            .subscribe(() => {
                AuthenticationInterceptor.token = undefined;
                AuthenticationInterceptor.user = undefined;
                this.router.navigate(['/player/sign-in']).catch(console.error);
            });
    }
}