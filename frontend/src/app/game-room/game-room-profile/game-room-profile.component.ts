import {Component, OnInit} from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { GameRoom } from "src/model/GameRoom";
import { Event } from "src/model/Event";
import { Record } from "src/model/Record";

import { GameRoomService } from "src/service/game-room.service";
import { EventService } from "src/service/event.service";
import { RecordService } from "src/service/record.service";

@Component({
    selector: 'app-game-room-profile',
    templateUrl: './game-room-profile.component.html',
    styleUrls: ['./game-room-profile.component.css']
})
export class GameRoomProfileComponent implements OnInit {
    gameRoom?: GameRoom;
    recordsLength : number = 0;
    events: Event[] = [];

    constructor(
        private gameRoomService: GameRoomService,
        private recordService: RecordService,
        private eventService: EventService,
        private route: ActivatedRoute
    ) {}


    ngOnInit() {
        let id = this.route.snapshot.paramMap.get("id");

        this.gameRoomService.getGameRoom(id ? parseInt(id) : undefined).subscribe({
            next: (gameRoom: GameRoom) => {
                this.gameRoom = gameRoom;
            },
            error: console.error
        });
        this.recordService.getGameRoomRecords(id ? parseInt(id) : undefined).subscribe({
            next: (records: Record[]) => {
                this.recordsLength = records.length;
            },
            error: console.error
        });
        this.eventService.getGameRoomEvents(id ? parseInt(id) : undefined).subscribe({
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
