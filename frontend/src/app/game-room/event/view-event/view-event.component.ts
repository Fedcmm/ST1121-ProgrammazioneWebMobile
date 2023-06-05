import { Component, OnInit } from '@angular/core';
import { Event } from 'src/model/Event';
import { EventService } from 'src/service/event.service';

@Component({
    selector: 'app-view-event',
    templateUrl: './view-event.component.html',
    styleUrls: ['./view-event.component.css']
})
export class ViewEventsComponent implements OnInit {
    events: Event[] = []; // Array di eventi da visualizzare

    constructor(private eventService: EventService) {}

    ngOnInit(): void {
        this.loadEvents();
    }

    loadEvents() {
        //TODO: Implementare la chiamata al servizio per ottenere gli eventi
    }
}
