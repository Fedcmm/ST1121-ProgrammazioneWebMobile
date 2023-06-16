import { Injectable } from '@angular/core';
import { Player } from "src/model/Player";
import { GameRoom } from "src/model/GameRoom";

@Injectable({
    providedIn: 'root'
})
export class AuthInfoService {

    accessToken?: string;
    user?: Player | GameRoom;
    userType: 'player' | 'game-room' | '' = '';

    constructor() { }
}
