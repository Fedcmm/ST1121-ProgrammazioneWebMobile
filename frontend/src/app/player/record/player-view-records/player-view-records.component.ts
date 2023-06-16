import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { Record } from 'src/model/Record';
import { RecordService } from 'src/service/record.service';

import { map } from "rxjs";
import { AuthInfoService } from "src/service/auth-info.service";

@Component({
    selector: 'app-player-view-records',
    templateUrl: './player-view-records.component.html',
    styleUrls: ['./player-view-records.component.css']
})
export class PlayerViewRecordsComponent implements OnInit {

    @Input() isPlayerProfile = false;
    @Output() receivedRecords = new EventEmitter<Record[]>();

    verifiedRecords: Record[] = [];


    constructor(
        private recordService: RecordService,
        private authInfo: AuthInfoService,
        private route: ActivatedRoute
    ) {}


    ngOnInit() {
        this.getVerifiedRecords();
    }

    getVerifiedRecords() {
        let id = this.route.snapshot.paramMap.get("id");

        this.recordService.getPlayerRecords(id ? parseInt(id) : this.authInfo.user!.id)
            .pipe(
                map(records => records.filter(record => record.isVerified)))
            .subscribe({
                next: verifiedRecords => {
                    this.verifiedRecords = verifiedRecords;
                }
        });
    }

    deleteRecord(record: Record) {
        // Implementa la logica per eliminare il record
    }
}
