import {Component} from '@angular/core';
import {Record} from 'src/model/Record';
import {RecordService} from 'src/service/record.service';
import {PlayerService} from "src/service/player.service";
import {GameRoomService} from "src/service/game-room.service";
import {GameService} from "src/service/game.service";

import {map} from "rxjs";

@Component({
    selector: 'app-view-record',
    templateUrl: 'view-record.component.html',
    styleUrls: ['view-record.component.css']
})
export class ViewRecordComponent {
    public verifiedRecords: Record[] = [];

    constructor(
        private recordService: RecordService,
        private playerService: PlayerService,
        private gameRoomService: GameRoomService,
        private gameService: GameService
    ) {
    }

    ngOnInit() {
        this.getVerifiedRecords();
    }

    getVerifiedRecords(): void {
        //TODO
        this.recordService.getVerifiedRecords(-1).subscribe(records => {
            this.verifiedRecords = records.filter(record => record.isVerified);
        });
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

    getGameRoomName(gameRoomId: number): string {
        let nameToReturn = ""
        this.gameRoomService.getGameRoom(gameRoomId).pipe(
            map(gameRoom => gameRoom.name))
            .subscribe(
                gameRoom => {
                    nameToReturn = gameRoom;
                }
            );
        return nameToReturn;
    }

    getGameName(gameId: number): string {
        let nameToReturn = ""
        this.gameService.getGame(gameId).pipe(
            map(getGame => getGame.name))
            .subscribe(
                getGame => {
                    nameToReturn = getGame;
                }
            );
        return nameToReturn;
    }

    navigateToPlayerProfile(playerId: number): void {
        // Implementa la logica per reindirizzare alla pagina del profilo del player
    }

    navigateToGameRoomProfile(gameRoomId: number): void {
        // Implementa la logica per reindirizzare alla pagina del profilo della gameroom
    }

    navigateToGameProfile(gameId: number): void {
        // Implementa la logica per reindirizzare alla pagina del profilo del game
    }

    deleteRecord(record: Record): void {
        // Implementa la logica per eliminare il record
    }


    protected readonly PlayerService = PlayerService;
}
