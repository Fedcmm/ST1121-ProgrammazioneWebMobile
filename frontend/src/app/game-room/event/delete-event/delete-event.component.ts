import { Component, OnInit } from '@angular/core';
import { EventService } from '../../../../service/event-service.service';
import { Event } from '../../../../model/Event';
@Component({
  selector: 'app-delete-event',
  templateUrl: './delete-event.component.html',
  styleUrls: ['./delete-event.component.css']
})
export class DeleteEventComponent implements OnInit {
  events: Event[] = [];
  eventsToDelete: Event[] = [];

  constructor(private eventService: EventService) {}

  ngOnInit() {
    this.eventService.getEvents(this.extractGameRoomIdFromToken()); // Recupero gli eventi della GameRoom dal backend all'inizio del componente
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

  extractGameRoomIdFromToken(): number {
    // Estrarre il GameRoomId dal token di sessione
    // Restituisci il GameRoomId estratto
    return 0;
  }
}
