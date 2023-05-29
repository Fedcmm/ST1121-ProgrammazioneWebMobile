import { Component } from '@angular/core';

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.css']
})
export class CreateEventComponent {
  gameRoom: string = '';
  startDate: string = '';
  endDate: string = '';
  description: string = '';

  createEvent(): void {
    const event = {
      gameRoom: this.gameRoom,
      startDate: this.startDate,
      endDate: this.endDate,
      description: this.description
    };

    // Esegui le azioni necessarie per salvare l'evento tramite il backend
    console.log('Event created:', event);
    // Puoi aggiungere il codice per inviare l'evento al backend tramite una richiesta HTTP POST o altre operazioni necessarie
  }
}
