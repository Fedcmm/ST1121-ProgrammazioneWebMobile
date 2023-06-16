import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { Record } from "src/model/Record";
import { RecordService } from "src/service/record.service";
import { map } from "rxjs";
import { AuthInfoService } from "src/service/auth-info.service";
import { GameRoomService } from "src/service/game-room.service";

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
        private authInfo: AuthInfoService,
        private route: ActivatedRoute
    ) { }


    ngOnInit() {
        let id = this.route.snapshot.paramMap.get("id");
        this.getGameRoomRecords(id ? parseInt(id) : this.authInfo.user!.id);
    }

    getGameRoomRecords(gameRoomId: number): void {
        this.gameRoomService.getRecords(gameRoomId).pipe(
            map(records => {
                return records.filter(record => !record.isVerified);
            })
        ).subscribe({
            next: (notVerifiedRecords) => {
                this.notVerifiedRecords = notVerifiedRecords;
            },
            error: error => {
                console.error(error);
            }
        });
    }

    //TODO: Da sistemare
    verifyRecord(record: Record) {
        record.isVerified = true;
        this.recordService.updateRecord(record)
    }
}
