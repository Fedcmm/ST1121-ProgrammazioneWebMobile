import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { ActivatedRoute } from "@angular/router";

import { Event } from 'src/model/Event';
import { EventService } from 'src/service/event.service';
import { GameRoomService} from "src/service/game-room.service";

@Component({
    selector: 'app-view-events',
    templateUrl: './game-room-view-event.component.html',
    styleUrls: ['./game-room-view-event.component.css']
})
export class GameRoomViewEventsComponent implements OnInit {
    @Input() isGameRoomProfile = false;
    @Output() receivedEvents = new EventEmitter<Event[]>();

    events: Event[] = []; // Array di eventi da visualizzare
    constructor(
        private eventService: EventService,
        private gameRoomService: GameRoomService,
        private route: ActivatedRoute
    ) { }

    ngOnInit() {
        let id = this.route.snapshot.paramMap.get("id");

        this.eventService.getEvents(id ? parseInt(id) : undefined).subscribe({
            next: (events: Event[]) => {
                this.events = events;
            },
            error: console.error
        });
    }
}
