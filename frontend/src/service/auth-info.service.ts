import { Injectable } from '@angular/core';
import { Player } from "src/model/Player";
import { GameRoom } from "src/model/GameRoom";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";

@Injectable({
    providedIn: 'root'
})
export class AuthInfoService {

    accessToken?: string;
    user?: Player | GameRoom;
    userType: 'player' | 'game-room' | '' = '';


    constructor(
        private http: HttpClient,
        private router: Router
    ) { }


    logout() {
        let urlUserPart = this.userType == 'player' ? 'player' : 'game-room';

        this.http.post(`http://localhost:8080/${urlUserPart}/logout`, {}).subscribe(() => {
        });

        this.router.navigate([`/${urlUserPart}/sign-in`]).catch(console.error);
        this.accessToken = undefined;
        this.user = undefined;
        this.userType = '';
    }
}
