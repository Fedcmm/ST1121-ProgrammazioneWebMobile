import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from "@angular/router";

import { Event } from 'src/model/Event';
import { AuthInfoService } from "src/service/auth-info.service";
import { GameRoomService } from "src/service/game-room.service";
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
        private gameRoomService: GameRoomService,
        private eventService: EventService,
        private authInfo: AuthInfoService,
        private route: ActivatedRoute
    ) {}


    ngOnInit() {
        this.getEvents()
    }

    getEvents() {
        let id = this.route.snapshot.paramMap.get("id");

        this.gameRoomService.getEvents(id ? parseInt(id) : this.authInfo.user!.id)
            .subscribe({
                next: (events: Event[]) => {
                    this.events = events;
                    this.receivedEvents.emit(events);
                },
                error: () => {
                    console.error();
                }
            });
    }

    deleteEvent(event: Event) {
        this.eventService.deleteEvent(event.id).subscribe({
            next: () => {
                this.getEvents();
            },
            error: error => {
                console.error(error);
            }
        });
    }
}
