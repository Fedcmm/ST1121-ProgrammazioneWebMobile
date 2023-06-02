import {Component} from '@angular/core';
import {Subscription} from "rxjs";
import {Event} from '../../../../model/Event';
import {EventService} from "../../../../service/event-service.service";

@Component({
    selector: 'app-create-event',
    templateUrl: './create-event.component.html',
    styleUrls: ['./create-event.component.css']
})

export class CreateEventComponent {
    name: string = '';
    description: string = '';

    startDate: Date = new Date();
    endDate: Date = new Date();

    constructor(private eventService: EventService) {
    }

    createEvent(): Subscription {
        const event = new Event(this.name, this.description, -1, this.startDate, this.endDate);
        return this.eventService.createEvent(event).subscribe({
            next: (response: Event) =>
            {
                event.id = response.id;
                console.log('Nuovo evento creato con ID:', event.id);
            },
            error: (error: any) => {
                //TODO: Gestire l'errore: utente già presente e blablabla
                console.error('Errore durante la creazione dell\'evento:', error);
            }
        });
    }
}