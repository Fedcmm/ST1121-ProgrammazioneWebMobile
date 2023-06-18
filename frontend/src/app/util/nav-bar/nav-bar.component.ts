import { Component } from '@angular/core';
import { AuthInfoService } from "src/service/auth-info.service";

@Component({
    selector: 'app-nav-bar',
    templateUrl: './nav-bar.component.html',
    styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {

    constructor(
        public authInfo: AuthInfoService,
    ) {}


    getUsername() {
        return this.authInfo.user?.username ?? '';
    }

    getProfileUrl() {
        let urlUserPart = this.authInfo.userType == 'player' ? 'player' : 'game-room';
        return `/${urlUserPart}/profile`;
    }
}