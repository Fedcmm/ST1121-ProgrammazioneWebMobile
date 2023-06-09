import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";

import { Event } from 'src/model/Event';
import { EventService } from 'src/service/event.service';
import { GameRoomService} from "src/service/game-room.service";

@Component({
    selector: 'app-view-event',
    templateUrl: './view-event.component.html',
    styleUrls: ['./view-event.component.css']
})
export class ViewEventsComponent implements OnInit {
    events: Event[] = []; // Array di eventi da visualizzare
    constructor(
        private eventService: EventService,
        private gameRoomService: GameRoomService,
        private route: ActivatedRoute
    ) {}

    ngOnInit() {
        let id = this.route.snapshot.paramMap.get("id");

        this.eventService.getEvents(id ? parseInt(id): undefined).subscribe({
            next: (events: Event[]) => {
                this.events = events;
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
}
