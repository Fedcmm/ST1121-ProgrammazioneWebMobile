import { Component } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { Player } from "src/model/Player";
import { AuthInfoService } from "src/service/auth-info.service";

@Component({
    selector: 'app-nav-bar',
    templateUrl: './nav-bar.component.html',
    styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {

    username = this.authInfo.user?.username ?? '';
    afterLogoutRoute = this.authInfo.user instanceof Player ? '/player/sign-in' : '/game-room/sign-in';


    constructor(
        private http: HttpClient,
        private authInfo: AuthInfoService,
        private router: Router
    ) {}


    logout() {
        let urlUserPart = this.authInfo.user instanceof Player ? 'player' : 'gameroom';

        this.http.post(`http://localhost:8080/${urlUserPart}/logout`, {})
            .subscribe(() => {
                this.authInfo.accessToken = undefined;
                this.authInfo.user = undefined;
                this.router.navigate(['/player/sign-in']).catch(console.error);
            });
    }
}