import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { Record } from "src/model/Record";
import { GameRoomService } from "src/service/game-room.service";
import { AuthInfoService } from "src/service/auth-info.service";
import { RecordService } from "src/service/record.service";

@Component({
    selector: 'app-game-room-record',
    templateUrl: './game-room-view-records.component.html',
    styleUrls: ['./game-room-view-records.component.css']
})
export class GameRoomViewRecordsComponent implements OnInit {

    isLoggedGameRoom = false;
    records: Record[] = [];


    constructor(
        private gameRoomService: GameRoomService,
        private recordService: RecordService,
        private authInfo: AuthInfoService,
        private route: ActivatedRoute
    ) {}


    ngOnInit() {
        this.route.queryParams.subscribe({
            next: (params) => {
                console.log(params)
            }
        });
        let id = parseInt(this.route.snapshot.queryParamMap.get("id")!);

        if (id == this.authInfo.user!.id) {
            this.getAllRecords();
        } else {
            this.getVerifiedRecords(id);
        }
    }

    deleteRecord(recordId: number) {
        this.recordService.deleteRecord(recordId).subscribe({
            next: () => {
                this.getAllRecords();
            }
        });
    }

    verifyRecord(recordId: number) {
        this.recordService.verifyRecord(recordId).subscribe({
            next: () => {
                this.getAllRecords();
            }
        });
    }

    private getVerifiedRecords(gameRoomId: number) {
        this.gameRoomService.getVerifiedRecords(gameRoomId)
            .subscribe({
                next: (verifiedRecords) => {
                    this.records = verifiedRecords;
                },
                error: error => {
                    console.error(error);
                }
            });
    }

    private getAllRecords() {
        this.isLoggedGameRoom = true;

        this.gameRoomService.getRecords(this.authInfo.user!.id)
            .subscribe({
                next: (records) => {
                    this.records = records;
                },
                error: error => {
                    console.error(error);
                }
            });
    }
}
