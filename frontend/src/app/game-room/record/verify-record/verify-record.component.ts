import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { Record } from "src/model/Record";
import { RecordService } from "src/service/record.service";
import { map } from "rxjs";
import { AuthInfoService } from "src/service/auth-info.service";

@Component({
    selector: 'app-verify-record',
    templateUrl: './verify-record.component.html',
    styleUrls: ['./verify-record.component.css']
})
export class VerifyRecordComponent implements OnInit {

    notVerifiedRecords: Record[] = [];


    constructor(
        private recordService: RecordService,
        private authInfo: AuthInfoService,
        private route: ActivatedRoute
    ) { }


    ngOnInit() {
        let id = this.route.snapshot.paramMap.get("id");
        this.getGameRoomRecords(id ? parseInt(id) : this.authInfo.user!.id);
    }

    getGameRoomRecords(gameRoomId: number): void {
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
    verifyRecord(record: Record) {
        record.isVerified = true;
        this.recordService.updateRecord(record)
    }
}
