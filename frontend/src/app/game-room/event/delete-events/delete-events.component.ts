import { Component, OnInit } from '@angular/core';
import { EventService } from 'src/service/event.service';
import { Event } from 'src/model/Event';

@Component({
    selector: 'app-delete-events',
    templateUrl: './delete-events.component.html',
    styleUrls: ['./delete-events.component.css']
})
export class DeleteEventsComponent implements OnInit {

    events: Event[] = [];
    eventsToDelete: Event[] = [];


    constructor(
        private eventService: EventService
    ) { }


    ngOnInit() {
        this.eventService.getEvents().subscribe({
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

    /**
     * Cancella gli eventi selezionati.
     */
    deleteSelectedEvents() {
        this.eventsToDelete.forEach((event) => {
            this.eventService.deleteEvent(event.id).subscribe(() => {
                const index = this.events.indexOf(event);
                if (index !== -1) {
                    this.events.splice(index, 1);
                }
            });
        });
    }
}
