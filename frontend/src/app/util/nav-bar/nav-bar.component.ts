import { Component } from '@angular/core';
import { AuthInfoService } from "src/service/auth-info.service";
import { GameRoom } from "src/model/GameRoom";

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
        if (this.authInfo.userType == 'game-room') {
            return (this.authInfo.user as GameRoom)!.name;
        }
        return this.authInfo.user?.username ?? '';
    }

    getProfileUrl() {
        let urlUserPart = this.authInfo.userType == 'player' ? 'player' : 'game-room';
        return `/${urlUserPart}/profile`;
    }
}