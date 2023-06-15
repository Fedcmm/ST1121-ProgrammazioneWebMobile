import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { Record } from 'src/model/Record';
import { RecordService } from 'src/service/record.service';
import { PlayerService } from "src/service/player.service";
import { GameRoomService } from "src/service/game-room.service";
import { GameService } from "src/service/game.service";

import { map } from "rxjs";
import { GameRoom } from "src/model/GameRoom";
import { Password } from "src/service/hash.service";
import { Game } from "src/model/Game";

@Component({
    selector: 'app-player-view-records',
    templateUrl: './player-view-records.component.html',
    styleUrls: ['./player-view-records.component.css']
})
export class PlayerViewRecordsComponent implements OnInit {
    @Input() isPlayerProfile = false;
    @Output() receivedRecords = new EventEmitter<Record[]>();

    verifiedRecords: Record[] = [new Record(undefined, new GameRoom(-1, 'name', '', new Password(''), [], []),
        new Game(-1, 'gname', '', []), new Date(), 2323, false),
        new Record(undefined, new GameRoom(-1, 'name', '', new Password(''), [], []),
            new Game(-1, 'gname', '', []), new Date(), 2323, true),
        new Record(undefined, new GameRoom(-1, 'name', '', new Password(''), [], []),
            new Game(-1, 'gname', '', []), new Date(), 2323, false)];


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

    getVerifiedRecords() {
        let id = this.route.snapshot.paramMap.get("id");

        this.recordService.getPlayerRecords(id ? parseInt(id) : undefined)
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
