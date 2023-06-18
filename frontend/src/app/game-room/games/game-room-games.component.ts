import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { GameRoomService } from "src/service/game-room.service";
import { Game } from "src/model/Game";
import { AuthInfoService } from "src/service/auth-info.service";

@Component({
    selector: 'game-room-games',
    templateUrl: './game-room-games.component.html',
    styleUrls: ['./game-room-games.component.css']
})
export class GameRoomGamesComponent implements OnInit {

    games: Game[] = [];


    constructor(
        private gameRoomService: GameRoomService,
        private authInfo: AuthInfoService,
        private route: ActivatedRoute
    ) {}


    ngOnInit() {
        let id = this.route.snapshot.queryParamMap.get("id")!;

        this.gameRoomService.getGames(id ? parseInt(id) : this.authInfo.user!.id).subscribe({
            next: (games: Game[]) => {
                this.games = games;
            },
            error: console.error
        });
    }
}
