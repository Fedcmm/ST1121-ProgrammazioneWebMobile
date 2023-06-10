import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { GameRoomService } from "src/service/game-room.service";
import { GameService } from "src/service/game.service";
import { Game } from "src/model/Game";

@Component({
    selector: 'app-game-room-games',
    templateUrl: './game-room-games.component.html',
    styleUrls: ['./game-room-games.component.css']
})
export class GameRoomGamesComponent implements OnInit {
    games: Game[] = []; // Array dei giochi da visualizzare
    constructor(
        private gameRoomService: GameRoomService,
        private gameService: GameService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        let id = this.route.snapshot.paramMap.get("id");

        this.getGamesOfGameRoom(id ? parseInt(id) : undefined);

    }

    getGamesOfGameRoom(id: number | undefined): void {
        this.gameRoomService.getGamesOfGameRoom(id).subscribe({
            next: (games: Game[]) => {
                this.games = games;
            },
            error: console.error
        });
    }

    getGameRoomName(gameRoomId: number): string {
        let gameRoomNameToReturn = ""
        this.gameRoomService.getGameRoom(gameRoomId).subscribe({
                next: (gameRoom) => {
                    gameRoomNameToReturn = gameRoom.name
                }
            }
        )
        return gameRoomNameToReturn;
    }

    getGameName(gameId: number): string {
        return this.gameService.getGameName(gameId);
    }
}
