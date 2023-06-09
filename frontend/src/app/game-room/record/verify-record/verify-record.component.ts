import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Record} from "src/model/Record";
import {RecordService} from "src/service/record.service";
import {GameRoomService} from "src/service/game-room.service";
import {GameService} from "src/service/game.service";
import {PlayerService} from "src/service/player.service";
import {map} from "rxjs";

@Component({
    selector: 'app-verify-record',
    templateUrl: './verify-record.component.html',
    styleUrls: ['./verify-record.component.css']
})
export class VerifyRecordComponent implements OnInit {
    notVerifiedRecords: Record[] = [];

    constructor(
        private recordService: RecordService,
        private gameRoomService: GameRoomService,
        private gameService: GameService,
        private playerService: PlayerService,
        private route: ActivatedRoute
    ) { }


    ngOnInit() {
        let id: string | null = this.route.snapshot.paramMap.get("id");

        this.getGameRoomRecords(id ? parseInt(id) : undefined);
    }

    getGameRoomName(gameRoomId: number): string {
        return this.gameRoomService.getGameRoomName(gameRoomId);
    }

    getGameName(gameRoomId: number): string {
        return this.gameService.getGameName(gameRoomId);
    }

    getPlayerName(gameRoomId: number): string {
        return this.playerService.getPlayerName(gameRoomId);
    }

    getGameRoomRecords(gameRoomId: number | undefined): void {
        this.recordService.getGameRoomRecords(gameRoomId).pipe(
            map(records => {
                return records.filter(record => !record.isVerified);
            })
        ).subscribe({
            next: (notVerifiedRecords) => {
                this.notVerifiedRecords = notVerifiedRecords;
            }
        });
    }

    //TODO: Da sistemare
    verifyRecord(record: Record): void {
        record.isVerified = true;
        this.recordService.updateRecord(record)
    }
}
