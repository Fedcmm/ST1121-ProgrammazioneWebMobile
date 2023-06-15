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

    newRecordForm!: FormGroup;

    gameRooms: GameRoom[] = [new GameRoom(0, 'Name', 'email', new Password(''), [], [])];
    games: Game[] = [new Game(0, 'Name', 'description', [])];


    constructor(
        private formBuilder: FormBuilder,
        private gameRoomService: GameRoomService,
        private gameService: GameService,
        private recordService: RecordService
    ) {}


    ngOnInit() {
        this.newRecordForm = this.formBuilder.group({
            gameRoom: '',
            game: '',
            score: '',
            date: ''
        });

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

        let record = new Record(undefined, gameRoom, game, date, score, false);
        this.recordService.createRecord(record).subscribe({
            next: (response: Record) => {
                record.player = response.player;
                record.gameRoom = response.gameRoom;
                record.game = response.game;
                console.log('Nuovo record creato con ID:');
            },
            error: error => {
                console.error(error);
            }
        });
    }
}
