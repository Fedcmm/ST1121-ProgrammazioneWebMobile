import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from "@angular/router";

import { Event } from 'src/model/Event';
import { AuthInfoService } from "src/service/auth-info.service";
import { EventService } from "src/service/event.service";

@Component({
    selector: 'game-room-view-events',
    templateUrl: './game-room-view-events.component.html',
    styleUrls: ['./game-room-view-events.component.css']
})
export class GameRoomViewEventsComponent implements OnInit {

    @Input() isGameRoomProfile = false;
    @Output() receivedEvents = new EventEmitter<Event[]>();

    events: Event[] = [];


    constructor(
        private eventService: EventService,
        private authInfo: AuthInfoService,
        private route: ActivatedRoute
    ) {}


    ngOnInit() {
        let id = this.route.snapshot.paramMap.get("id");

        this.eventService.getGameRoomEvents(id ? parseInt(id) : this.authInfo.user!.id).subscribe({
            next: (events: Event[]) => {
                this.events = events;
            },
            error: console.error
        });
    }
}
