import { Component } from '@angular/core';
import { Record } from "src/model/Record";
import { RecordService } from "src/service/record.service";
import { ActivatedRoute} from "@angular/router";

@Component({
  selector: 'game-room-delete-record',
  templateUrl: './game-room-delete-record.component.html',
  styleUrls: ['./game-room-delete-record.component.css']
})
export class GameRoomDeleteRecordComponent {

  records: Record[] = [];
  recordsToDelete: Record[] = [];


  constructor(
      private recordService: RecordService,
      private route: ActivatedRoute
  ) { }

  ngOnInit() {
    let id: string | null = this.route.snapshot.paramMap.get("id");

    this.recordService.getGameRoomRecords(id ? parseInt(id) : undefined).subscribe({
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

  /**
   * Cancella i record selezionati.
   */
  deleteSelectedRecords() {
    this.recordsToDelete.forEach((record) => {
      this.recordService.deleteRecord(record.id).subscribe(() => {
        const index = this.records.indexOf(record);
        if (index !== -1) {
          this.records.splice(index, 1);
        }
      });
    });
  }
}
