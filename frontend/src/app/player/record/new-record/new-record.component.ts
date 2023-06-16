import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from "@angular/forms";

import { GameRoomService } from 'src/service/game-room.service';
import { GameService } from "src/service/game.service";
import { RecordService } from "src/service/record.service";
import { Record } from "src/model/Record";
import { GameRoom } from "src/model/GameRoom";
import { Game } from "src/model/Game";
import { Password } from "src/service/hash.service";

@Component({
    selector: 'app-new-record',
    templateUrl: './new-record.component.html',
    styleUrls: ['./new-record.component.css']
})
export class NewRecordComponent implements OnInit {

    newRecordForm: FormGroup;

    gameRooms: GameRoom[] = [new GameRoom(-1, 'roomname', '', new Password(''), [], []), new GameRoom(-1, 'roomname', '', new Password(''), [], [])];
    games: Game[] = [new Game(-1, 'gamename', '', []), new Game(-1, 'gamename', '', [])];


    constructor(
        private formBuilder: FormBuilder,
        private gameRoomService: GameRoomService,
        private gameService: GameService,
        private recordService: RecordService
    ) {
        this.newRecordForm = this.formBuilder.group({
            gameRoom: '',
            game: '',
            score: '',
            date: ''
        });
    }


    ngOnInit() {
        this.gameRoomService.getGameRooms().subscribe({
            next: gameRooms => {
                this.gameRooms = gameRooms;
            }
        });
    }

    getGames() {
        this.gameRoomService.getGames(this.newRecordForm.get('gameRoom')?.value).subscribe({
            next: games => {
                this.games = games;
            }
        });
    }

    createRecord() {
        if (this.newRecordForm.invalid) {
            console.log("Invalid form")
            return;
        }

        let gameRoom = this.newRecordForm.get('gameRoom')?.value;
        let game = this.newRecordForm.get('game')?.value;
        let score = this.newRecordForm.get('score')?.value;
        let date = this.newRecordForm.get('date')?.value;

        let record = new Record(-1, undefined, gameRoom, game, date, score, false);
        this.recordService.createRecord(record).subscribe({
            next: (response: Record) => {
                record.game = response.game;
            },
            error: error => {
                console.error(error);
            }
        });
    }
}
