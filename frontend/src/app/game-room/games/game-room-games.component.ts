import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { GameRoomService } from "src/service/game-room.service";
import { GameService } from "src/service/game.service";
import { Game } from "src/model/Game";

@Component({
    selector: 'game-room-games',
    templateUrl: './game-room-games.component.html',
    styleUrls: ['./game-room-games.component.css']
})
export class GameRoomGamesComponent implements OnInit {
    games: Game[] = []; // Array dei giochi da visualizzare
    constructor(
        private gameRoomService: GameRoomService,
        private gameService: GameService,
        private route: ActivatedRoute
    ) { }

    ngOnInit() {
        let id = this.route.snapshot.paramMap.get("id");

        this.gameService.getGameRoomGames(id ? parseInt(id) : undefined).subscribe({
            next: (games: Game[]) => {
                this.games = games;
            },
            error: console.error
        });

    }
}
