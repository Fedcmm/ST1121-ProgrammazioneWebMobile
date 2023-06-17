import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from "@angular/forms";

import { GameRoomService } from 'src/service/game-room.service';
import { GameService } from "src/service/game.service";
import { RecordService } from "src/service/record.service";
import { Record } from "src/model/Record";
import { GameRoom } from "src/model/GameRoom";
import { Game } from "src/model/Game";
import { AuthInfoService } from "src/service/auth-info.service";
import { Player } from "src/model/Player";
import { HttpErrorResponse } from "@angular/common/http";
import { Router } from "@angular/router";

@Component({
    selector: 'app-new-record',
    templateUrl: './new-record.component.html',
    styleUrls: ['./new-record.component.css']
})
export class NewRecordComponent implements OnInit {

    newRecordForm: FormGroup;

    gameRooms: GameRoom[] = [];
    games: Game[] = [];
    showError = false;
    errorMessage = '';


    constructor(
        private formBuilder: FormBuilder,
        private gameRoomService: GameRoomService,
        private gameService: GameService,
        private recordService: RecordService,
        private authInfo: AuthInfoService,
        private router: Router
    ) {
        this.newRecordForm = this.formBuilder.group({
            gameRoom: '',
            game: '',
            score: '',
            date: ''
        });
    }


    ngOnInit() {
        this.newRecordForm.get('gameRoom')?.disable();
        this.newRecordForm.get('game')?.disable();

        this.gameRoomService.getGameRooms().subscribe({
            next: gameRooms => {
                this.newRecordForm.get('gameRoom')?.enable();
                this.gameRooms = gameRooms;
            }
        });
    }

    getGames() {
        this.newRecordForm.get('game')?.disable();
        this.gameRoomService.getGames(this.newRecordForm.get('gameRoom')?.value.id).subscribe({
            next: games => {
                this.newRecordForm.get('game')?.enable();
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

        let record = new Record(-1, this.authInfo.user as Player, gameRoom, game, date, score, false);
        this.recordService.createRecord(record).subscribe({
            next: (response: Record) => {
                this.showError = false;
                record.game = response.game;
                this.router.navigate(['/player/profile']).catch(console.error);
            },
            error: error => {
                this.displayError(error);
            }
        });
    }

    private displayError(error: HttpErrorResponse) {
        this.errorMessage = error.error;
        this.showError = true;
        console.error(error);
    }
}
