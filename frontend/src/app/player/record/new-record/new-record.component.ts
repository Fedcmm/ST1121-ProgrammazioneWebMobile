import { Component, OnInit } from '@angular/core';

import { GameRoomService } from 'src/service/game-room.service';
import { GameService } from "src/service/game.service";
import { RecordService } from "src/service/record.service";
import { Record } from "src/model/Record";
import { GameRoom } from "src/model/GameRoom";
import { Game } from "src/model/Game";

@Component({
    selector: 'app-new-record',
    templateUrl: './new-record.component.html',
    styleUrls: ['./new-record.component.css']
})
export class NewRecordComponent implements OnInit {

    selectedGameRoom?: GameRoom;
    selectedGame?: Game;
    score: number = 0;
    date: Date = new Date()

    gameRooms: GameRoom[] = [];
    games: Game[] = [];


    constructor(
        private gameRoomService: GameRoomService,
        private gameService: GameService,
        private recordService: RecordService
    ) {}


    ngOnInit() {
        this.gameRoomService.getGameRooms().subscribe({
            next: gameRooms => {
                this.gameRooms = gameRooms;
            }
        });
    }

    getGames() {
        this.gameService.getGames(this.selectedGameRoom!.id).subscribe({
            next: games => {
                this.games = games;
            }
        });
    }

    createRecord() {
        let record = new Record(-1,undefined, this.selectedGameRoom!, this.selectedGame!, this.date, this.score, false);
        this.recordService.createRecord(record).subscribe({
            next: (response: Record) => {
                record.player = response.player;
                record.gameRoom = response.gameRoom;
                record.game = response.game;
                console.log('Nuovo record creato con ID:');
            }
        });
    }
}
