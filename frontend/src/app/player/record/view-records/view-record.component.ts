import {Component} from '@angular/core';
import {map} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import {Record} from 'src/model/Record';
import {RecordService} from 'src/service/record.service';
import {PlayerService} from "src/service/player.service";
import {GameRoomService} from "src/service/game-room.service";
import {GameService} from "src/service/game.service";
import {Player} from "../../../../model/Player";


@Component({
    selector: 'app-view-record',
    templateUrl: './view-record.component.html',
    styleUrls: ['./view-record.component.css']
})
export class ViewRecordComponent {
    player?: Player;
    verifiedRecords: Record[] = [];
    notVerifiedRecords: Record[] = [];

    constructor(
        private recordService: RecordService,
        private playerService: PlayerService,
        private gameRoomService: GameRoomService,
        private gameService: GameService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.getVerifiedRecords();
    }

    getVerifiedRecords(): void {
        let id = this.route.snapshot.paramMap.get("id");

        this.playerService.getPlayer(id ? parseInt(id) : undefined).subscribe({
            next: (player: Player) => {
                this.player = player;
            },
            error: console.error
        });

        this.recordService.getPlayerRecords(id ? parseInt(id) : undefined
        ).pipe(
            map(records => {
                const verifiedRecords = records.filter(record => record.isVerified);
                const notVerifiedRecords = records.filter(record => !record.isVerified);
                return {verifiedRecords, notVerifiedRecords};
            })
        ).subscribe({
            next: ({verifiedRecords, notVerifiedRecords}) => {
                this.verifiedRecords = verifiedRecords;
                this.notVerifiedRecords = notVerifiedRecords;
            }
        })
    }

    getPlayerName(playerId: number): string {
        let nameToReturn = ""
        this.playerService.getPlayer(playerId).pipe(
            map(player => player.name))
            .subscribe(
                player => {
                    nameToReturn = player;
                }
            );
        return nameToReturn;
    }

    getGameRoomName(roomId
                        :
                        number
    ):
        string {
        let result = ""
        this.gameRoomService.getGameRoom(roomId).subscribe({
            next: (gameRoom) => {
                result = gameRoom.name
            },
            error: console.error
        });

        return result;
    }

    getGameName(gameId
                    :
                    number
    ):
        string {
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
