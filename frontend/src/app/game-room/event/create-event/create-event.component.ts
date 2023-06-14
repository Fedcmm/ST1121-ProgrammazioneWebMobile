import { Component } from '@angular/core';
import { Event } from 'src/model/Event';
import { EventService } from "src/service/event.service";

@Component({
    selector: 'app-create-event',
    templateUrl: './create-event.component.html',
    styleUrls: ['./create-event.component.css']
})
export class CreateEventComponent {
    name = '';
    description = '';

    startDate: Date = new Date();
    endDate: Date = new Date();

    constructor(
        private eventService: EventService
    ) { }

    createEvent() {
        const event = new Event(-1, this.name, this.description, undefined, this.startDate, this.endDate);

        this.eventService.createEvent(event).subscribe({
            next: (response: Event) =>
            {
                event.id = response.id;
                console.log('Nuovo evento creato con ID:', event.id);
            },
            error: (error) => {
                //TODO: Gestire l'errore: utente già presente e blablabla
                console.error('Errore durante la creazione dell\'evento:', error);
            }
        });
    }
}