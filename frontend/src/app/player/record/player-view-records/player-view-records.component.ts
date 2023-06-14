import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { Record } from 'src/model/Record';
import { RecordService } from 'src/service/record.service';
import { PlayerService } from "src/service/player.service";
import { GameRoomService } from "src/service/game-room.service";
import { GameService } from "src/service/game.service";

import { map } from "rxjs";

@Component({
    selector: 'app-player-view-records',
    templateUrl: './player-view-records.component.html',
    styleUrls: ['./player-view-records.component.css']
})
export class PlayerViewRecordsComponent implements OnInit {
    @Input() isPlayerProfile = false;
    @Output() receivedRecords = new EventEmitter<Record[]>();

    verifiedRecords: Record[] = [];
    notVerifiedRecords: Record[] = [];


    constructor(
        private recordService: RecordService,
        private playerService: PlayerService,
        private gameRoomService: GameRoomService,
        private gameService: GameService,
        private route: ActivatedRoute
    ) {}


    ngOnInit() {
        this.getVerifiedRecords();
    }

    getVerifiedRecords(): void {
        let id = this.route.snapshot.paramMap.get("id");

        this.recordService.getPlayerRecords(id ? parseInt(id) : undefined)
            .pipe(
                map(records => {
                    const verifiedRecords = records.filter(record => record.isVerified);
                    const notVerifiedRecords = records.filter(record => !record.isVerified);
                    return { verifiedRecords, notVerifiedRecords };
                }))
            .subscribe({
                next: ({ verifiedRecords, notVerifiedRecords }) => {
                    this.verifiedRecords = verifiedRecords;
                    this.notVerifiedRecords = notVerifiedRecords;
                }
        })
    }

    deleteRecord(record: Record) {
        // Implementa la logica per eliminare il record
    }
}