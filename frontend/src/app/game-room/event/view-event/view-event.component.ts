import { Component } from '@angular/core';
import { Event } from '../../../../model/Event';
import { EventService } from '../../../../service/event-service.service';

@Component({
  selector: 'app-view-component',
  templateUrl: './view-component.component.html',
  styleUrls: ['./view-component.component.css']
})
export class ViewEventsComponent {
  events: Event[] = []; // Array di eventi da visualizzare

    constructor(private eventService: EventService) {}

  ngOnInit(): void {
    this.loadEvents();
  }

  loadEvents() {
      //TODO: Implementare la chiamata al servizio per ottenere gli eventi
  }
}
