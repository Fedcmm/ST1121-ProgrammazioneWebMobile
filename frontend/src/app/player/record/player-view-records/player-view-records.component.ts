import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { Record } from 'src/model/Record';
import { RecordService } from 'src/service/record.service';

import { AuthInfoService } from "src/service/auth-info.service";
import { PlayerService } from "src/service/player.service";

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
        private playerService: PlayerService,
        private recordService: RecordService,
        private authInfo: AuthInfoService,
        private route: ActivatedRoute
    ) {}


    ngOnInit() {
        this.getVerifiedRecords();
    }

    getVerifiedRecords() {
        let id = this.route.snapshot.paramMap.get("id");

        this.playerService.getVerifiedRecords(id ? parseInt(id) : this.authInfo.user!.id)
            .subscribe({
                next: verifiedRecords => {
                    this.verifiedRecords = verifiedRecords;
                },
                error: error => {
                    console.error(error);
                }
            });
    }

    deleteRecord(record: Record) {
        // Implementa la logica per eliminare il record
    }
}
