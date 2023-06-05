import {Component, OnInit} from '@angular/core';

import {GameRoomService} from 'src/service/game-room.service';
import {GameService} from "src/service/game.service";
import {RecordService} from "src/service/record.service";
import {Record} from "src/model/Record";
import {map} from "rxjs";

@Component({
    selector: 'app-new-record',
    templateUrl: './new-record.component.html',
    styleUrls: ['./new-record.component.css']
})
export class NewRecordComponent implements OnInit {

    selectedGameRoom: number = -1;
    selectedGame: number = -1;
    score: number = 0;
    date: Date = new Date()

    gameRooms: { id: number, name: string }[] = [];
    games: { id: number, name: string }[] = [];

    constructor(
        private gameRoomService: GameRoomService,
        private gameService: GameService,
        private recordService: RecordService) {
    }

    ngOnInit() {
        this.gameRoomService.getGameRooms().pipe(
            map(gameRooms => gameRooms.map(({ id, name }) => ({ id, name })))
        ).subscribe(gameRooms => {
            this.gameRooms = gameRooms;
        });
    }

    getGamesInfo() {
        this.gameService.getGames(this.selectedGameRoom).pipe(
            map(games => games.map(({id, name}) => ({id, name})))).
        subscribe(games => {
            this.games = games;
        });
    }

    createRecord() {
        this.saveRecord(new Record(-1, this.selectedGameRoom, this.selectedGame, this.date, this.score, false));
    }

    saveRecord(record: Record) {
        this.recordService.createRecord(record).subscribe(
            (response: Record) => {
                record.player = response.player;
                record.gameRoom = response.gameRoom;
                record.game = response.game;
                console.log('Nuovo record creato con ID:');
            });
    }
}
