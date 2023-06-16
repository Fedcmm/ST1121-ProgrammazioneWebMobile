import { Component, OnInit } from '@angular/core';
import { Record } from "src/model/Record";
import { RecordService } from "src/service/record.service";
import { GameRoomService } from "src/service/game-room.service";
import { AuthInfoService } from "src/service/auth-info.service";

@Component({
    selector: 'game-room-delete-record',
    templateUrl: './game-room-delete-records.component.html',
    styleUrls: ['./game-room-delete-records.component.css']
})
export class GameRoomDeleteRecordsComponent implements OnInit {

    records: Record[] = [];
    recordsToDelete: Record[] = [];


    constructor(
        private recordService: RecordService,
        private gameRoomService: GameRoomService,
        private authInfo: AuthInfoService,
    ) {}


    ngOnInit() {
        this.gameRoomService.getRecords(this.authInfo.user!.id).subscribe({
            next: (records: Record[]) => {
                this.records = records;
            }
        });
    }

    /**
     * Sposta l'elemento selezionato dall'array "records" all'array "recordsToDelete" e viceversa.
     * @param record
     */
    moveToRecordsToDelete(record: any) {
        if (record.target.checked) {
            this.recordsToDelete.push(record);
        } else {
            const index = this.recordsToDelete.indexOf(record);
            if (index !== -1) {
                this.recordsToDelete.splice(index, 1);
            }
        }
    }

    deleteSelectedRecords() {
        this.recordsToDelete.forEach((record) => {
            this.recordService.deleteRecord(record).subscribe(() => {
                const index = this.records.indexOf(record);
                if (index !== -1) {
                    this.records.splice(index, 1);
                }
            });
        });
    }
}
