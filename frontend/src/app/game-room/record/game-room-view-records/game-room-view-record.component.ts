import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { Record } from "src/model/Record";
import { RecordService } from "src/service/record.service";
import { GameRoomService } from "src/service/game-room.service";
import { GameService } from "src/service/game.service";
import { PlayerService } from "src/service/player.service";
import { map } from "rxjs";

@Component({
    selector: 'app-game-room-record',
    templateUrl: './game-room-view-record.component.html',
    styleUrls: ['./game-room-view-record.component.css']
})
export class GameRoomViewRecordComponent implements OnInit{
    verifiedRecords: Record[] = [];


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

    getGameRoomRecords(gameRoomId?: number): void {
        this.recordService.getPlayerRecords(gameRoomId)
            .pipe(map(records => {
                return records.filter(record => record.isVerified);
            }))
            .subscribe({
                next: (verifiedRecords) => {
                    this.verifiedRecords = verifiedRecords;
                }
            });
    }
}
