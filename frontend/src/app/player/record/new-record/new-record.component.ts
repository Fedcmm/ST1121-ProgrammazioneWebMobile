import { Component, OnInit } from '@angular/core';

import { GameRoomService } from 'src/service/game-room-service.service';
import {GameService} from "../../../../service/game-service.service";
import {RecordService} from "../../../../service/record-service.service";
import {Record} from "../../../../model/Record";

@Component({
    selector: 'app-new-record',
    templateUrl: './new-record.component.html',
    styleUrls: ['./new-record.component.css']
})
export class NewRecordComponent implements OnInit {

    selectedGameRoom: number = 0;
    selectedGame: number = 0;
    score: number = 0;
    date: Date = new Date()
    
    games: any;

    constructor(
        private gameRoomService: GameRoomService,
        private gameService: GameService,
        private recordService: RecordService) {}

    ngOnInit() {
        this.gameRoomService.getGameRooms();
    }

    getGames() {
        this.gameService.getGames(this.selectedGameRoom);
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
