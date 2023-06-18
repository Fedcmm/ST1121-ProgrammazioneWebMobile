import { Component, OnInit } from '@angular/core';
import { EventService } from 'src/service/event.service';
import { Event } from 'src/model/Event';
import { AuthInfoService } from "src/service/auth-info.service";
import { GameRoomService } from "src/service/game-room.service";

@Component({
    selector: 'game-room-delete-events',
    templateUrl: './delete-events.component.html',
    styleUrls: ['./delete-events.component.css']
})
export class DeleteEventsComponent implements OnInit {

    events: Event[] = [];
    eventsToDelete: Event[] = [];


    constructor(
        private eventService: EventService,
        private gameRoomService: GameRoomService,
        private authInfo: AuthInfoService
    ) {
    }


    ngOnInit() {
        this.gameRoomService.getEvents(this.authInfo.user!.id).subscribe({
            next: (events: Event[]) => {
                this.events = events;
            }
        });
    }

    /**
     * Sposta l'elemento selezionato dall'array "events" all'array "eventsToDelete" e viceversa.
     * @param event
     */
    moveToEventsToDelete(event: any) {
        if (event.target.checked) {
            this.eventsToDelete.push(event);
        } else {
            const index = this.eventsToDelete.indexOf(event);
            if (index !== -1) {
                this.eventsToDelete.splice(index, 1);
            }
        }
    }

    deleteSelectedEvents() {
        this.eventService.deleteEvents(this.returnEventsId());
        this.eventsToDelete = [];
    }

    returnEventsId(): number[]{
        const idToReturn: number[] = [];
        this.eventsToDelete.forEach(event => {
            if (event.id != null) {
                idToReturn.push(event.id);
            }
        });
        return idToReturn;
    }
}
