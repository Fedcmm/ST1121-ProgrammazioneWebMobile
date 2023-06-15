import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { Record } from "src/model/Record";
import { RecordService } from "src/service/record.service";
import { GameRoomService } from "src/service/game-room.service";
import { map } from "rxjs";
import { AuthInfoService } from "src/service/auth-info.service";

@Component({
    selector: 'app-game-room-record',
    templateUrl: './game-room-view-records.component.html',
    styleUrls: ['./game-room-view-records.component.css']
})
export class GameRoomViewRecordsComponent implements OnInit {

    verifiedRecords: Record[] = [];


    constructor(
        private recordService: RecordService,
        private gameRoomService: GameRoomService,
        private authInfo: AuthInfoService,
        private route: ActivatedRoute
    ) {}


    ngOnInit() {
        let id = this.route.snapshot.paramMap.get("id");

        this.getGameRoomRecords(id ? parseInt(id) : this.authInfo.user!.id);
    }

    getGameRoomRecords(gameRoomId: number) {
        this.recordService.getGameRoomRecords(gameRoomId)
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
