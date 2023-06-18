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
        this.getRecords();
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
        this.recordService.deleteRecords(this.recordsToDelete.map(record => record.id)).subscribe({
            next: () => {
                this.recordsToDelete = [];
                this.getRecords();
            },
            error: error => {
                console.error(error);
            }
        });
    }

    private getRecords() {
        this.gameRoomService.getRecords(this.authInfo.user!.id).subscribe({
            next: (records: Record[]) => {
                this.records = records;
            }
        });
    }
}
