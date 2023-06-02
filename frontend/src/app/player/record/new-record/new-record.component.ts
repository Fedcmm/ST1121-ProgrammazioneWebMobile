import { Component, OnInit } from '@angular/core';

import * as jwt_decode from "jwt-decode";
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

    //TODO: risolvere il problema di sto coso qua sotto
    playerId: number = jwt_decode(localStorage.getItem('token')).playerId;
    selectedGameRoom: number = 0;
    selectedGame: number = 0;
    score: number = 0;
    date: Date = new Date()
    
    //Mi dava errore se non li dichiaravo
    private recordService: any;
    private gameService: any;
    games: any;

    constructor(private gameRoomService: GameRoomService, gameService: GameService, recordService: RecordService ) {}

    ngOnInit(): void {
        this.gameRoomService.getGameRooms();
    }

    getGames(): void {
        this.gameService.getGames(this.selectedGameRoom);
    }
    
    createRecord(): void {
        this.saveRecord(new Record(this.playerId, this.selectedGameRoom, this.selectedGame, this.date, this.score, false));
    }

    saveRecord(record: Record): void {
        this.recordService.createRecord(record).subscribe(
            (response: Record) => {
                record.player = response.player;
                record.gameRoom = response.gameRoom;
                record.game = response.game;
                console.log('Nuovo record creato con ID:');
            },
            (error: any) => {
    }
}
