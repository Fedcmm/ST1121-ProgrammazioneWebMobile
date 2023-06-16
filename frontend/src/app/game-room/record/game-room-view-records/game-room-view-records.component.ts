import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { Record } from "src/model/Record";
import { GameRoomService } from "src/service/game-room.service";
import { AuthInfoService } from "src/service/auth-info.service";

@Component({
    selector: 'app-game-room-record',
    templateUrl: './game-room-view-records.component.html',
    styleUrls: ['./game-room-view-records.component.css']
})
export class GameRoomViewRecordsComponent implements OnInit {

    verifiedRecords: Record[] = [];


    constructor(
        private gameRoomService: GameRoomService,
        private authInfo: AuthInfoService,
        private route: ActivatedRoute
    ) {}


    ngOnInit() {
        let id = this.route.snapshot.paramMap.get("id");

        this.getGameRoomRecords(id ? parseInt(id) : this.authInfo.user!.id);
    }

    getGameRoomRecords(gameRoomId: number) {
        this.gameRoomService.getVerifiedRecords(gameRoomId)
            .subscribe({
                next: (verifiedRecords) => {
                    this.verifiedRecords = verifiedRecords;
                },
                error: error => {
                    console.error(error);
                }
            });
    }
}
