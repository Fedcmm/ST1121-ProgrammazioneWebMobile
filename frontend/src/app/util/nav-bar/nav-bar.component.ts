import { Component } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { AuthInfoService } from "src/service/auth-info.service";

@Component({
    selector: 'app-nav-bar',
    templateUrl: './nav-bar.component.html',
    styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {

    constructor(
        public authInfo: AuthInfoService,
        private http: HttpClient,
        private router: Router
    ) {}


    logout() {
        let urlUserPart = this.authInfo.userType == 'player' ? 'player' : 'game-room';

        this.http.post(`http://localhost:8080/${urlUserPart}/logout`, {})
            .subscribe(() => {
                this.authInfo.accessToken = undefined;
                this.authInfo.user = undefined;
                this.router.navigate(['/player/sign-in']).catch(console.error);
            });
    }

    logoutRoute() {
        return this.authInfo.userType == 'player' ? '/player/sign-in' : '/game-room/sign-in';
    }
}