import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";

import { Player } from "src/model/Player";
import { Record } from "src/model/Record";
import { PlayerService } from "src/service/player.service";
import { RecordService } from "src/service/record.service";
import { GameRoomService } from "src/service/game-room.service";
import { GameService } from "src/service/game.service";

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
    player?: Player;
    records: Record[] = [];
    
    constructor(
        private playerService: PlayerService,
        private recordService: RecordService,
        private gameRoomService: GameRoomService,
        private gameService: GameService,
        private route: ActivatedRoute
    ) {}


    ngOnInit() {
        let id = this.route.snapshot.paramMap.get("id");

        this.playerService.getPlayer(id ? parseInt(id) : undefined).subscribe({
            next: (player: Player) => {
                this.player = player;
            },
            error: console.error
        });
        this.recordService.getPlayerRecords(id ? parseInt(id) : undefined).subscribe({
            next: (records: Record[]) => {
                this.records = records;
            },
            error: console.error
        });
    }

    getGameRoomName(roomId: number): string {
        let result = ""
        this.gameRoomService.getGameRoom(roomId).subscribe({
            next: (gameRoom) => {
                result = gameRoom.name
            },
            error: console.error
        });

        return result;
    }

    getGameName(gameId: number): string {
        let result = ""
        this.gameService.getGame(gameId).subscribe({
            next: (game) => {
                result = game.name
            },
            error: console.error
        });

        return result;
    }
}
