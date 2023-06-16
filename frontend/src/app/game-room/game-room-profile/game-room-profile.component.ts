import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { GameRoom } from "src/model/GameRoom";
import { Event } from "src/model/Event";
import { Record } from "src/model/Record";

import { GameRoomService } from "src/service/game-room.service";
import { EventService } from "src/service/event.service";
import { RecordService } from "src/service/record.service";
import { AuthInfoService } from "src/service/auth-info.service";

@Component({
    selector: 'game-room-profile',
    templateUrl: './game-room-profile.component.html',
    styleUrls: ['./game-room-profile.component.css']
})
export class GameRoomProfileComponent implements OnInit {

    gameRoom?: GameRoom;
    recordsLength = 0;
    events: Event[] = [];

    constructor(
        private gameRoomService: GameRoomService,
        private recordService: RecordService,
        private eventService: EventService,
        private authInfo: AuthInfoService,
        private route: ActivatedRoute
    ) {}


    ngOnInit() {
        let routeId = this.route.snapshot.paramMap.get("id");
        let id = routeId ? parseInt(routeId) : this.authInfo.user!.id;

        this.gameRoomService.getGameRoom(id).subscribe({
            next: (gameRoom: GameRoom) => {
                this.gameRoom = gameRoom;
            },
            error: console.error
        });
        this.recordService.getGameRoomRecords(id).subscribe({
            next: (records: Record[]) => {
                this.recordsLength = records.length;
            },
            error: console.error
        });
        this.eventService.getGameRoomEvents(id).subscribe({
            next: (events: Event[]) => {
                this.events = events;
            },
            error: console.error
        });
    }

    onEventsReceived(events: Event[]) {
        this.events = events;
    }
}
