import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { Player } from "src/model/Player";
import { Record } from 'src/model/Record';
import { RecordService } from 'src/service/record.service';
import { PlayerService } from "src/service/player.service";
import { GameRoomService } from "src/service/game-room.service";
import { GameService } from "src/service/game.service";

import {map} from "rxjs";

@Component({
    selector: 'app-view-records',
    templateUrl: './view-records.component.html',
    styleUrls: ['./view-records.component.css']
})
export class ViewRecordsComponent implements OnInit {
    @Input() isPlayerProfile = false;
    @Output() receivedRecords = new EventEmitter<Record[]>();

    player: Player | undefined;
    verifiedRecords: Record[] = [];
    notVerifiedRecords: Record[] = [];


    constructor(
        private recordService: RecordService,
        private playerService: PlayerService,
        private gameRoomService: GameRoomService,
        private gameService: GameService,
        private route: ActivatedRoute
    ) {
    }


    ngOnInit() {
        this.getVerifiedRecords();
    }

    getVerifiedRecords(): void {
        let id = this.route.snapshot.paramMap.get("id");

        this.playerService.getPlayer(id ? parseInt(id) : undefined).subscribe({
            next: (player: Player) => {
                this.player = player;
            },
            error: console.error
        });

        this.recordService.getPlayerRecords(id ? parseInt(id) : undefined
        ).pipe(
            map(records => {
                const verifiedRecords = records.filter(record => record.isVerified);
                const notVerifiedRecords = records.filter(record => !record.isVerified);
                return {verifiedRecords, notVerifiedRecords};
            })
        ).subscribe({
            next: ({verifiedRecords, notVerifiedRecords}) => {
                this.verifiedRecords = verifiedRecords;
                this.notVerifiedRecords = notVerifiedRecords;
            }
        })
    }

    getPlayerName(playerId: number): string {
        let nameToReturn = ""
        this.playerService.getPlayer(playerId).pipe(
            map(player => player.name))
            .subscribe(
                player => {
                    nameToReturn = player;
                }
            );
        return nameToReturn;
    }

    getGameRoomName(gameRoomId: number): string {
        let nameToReturn = ""
        this.gameRoomService.getGameRoom(gameRoomId).pipe(
            map(gameRoom => gameRoom.name))
            .subscribe(
                gameRoom => {
                    nameToReturn = gameRoom;
                }
            );
        return nameToReturn;
    }

    getGameName(gameId: number): string {
        let nameToReturn = ""
        this.gameService.getGame(gameId).pipe(
            map(getGame => getGame.name))
            .subscribe(
                getGame => {
                    nameToReturn = getGame;
                }
            );
        return nameToReturn;
    }

    deleteRecord(record: Record) {
        // Implementa la logica per eliminare il record
    }
}
