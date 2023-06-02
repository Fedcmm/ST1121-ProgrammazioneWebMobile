import {Component} from '@angular/core';
import {Subscription} from "rxjs";
import {Event} from '../../../../model/Event';
import {EventService} from "../../../../service/event-service.service";
import * as jwt_decode from "jwt-decode";

@Component({
    selector: 'app-create-event',
    templateUrl: './create-event.component.html',
    styleUrls: ['./create-event.component.css']
})

export class CreateEventComponent {
    name: string = '';
    description: string = '';

    //TODO: risolvere il problema di sto coso qua sotto
    gameRoomId: number = jwt_decode(localStorage.getItem('token')).gameRoomId;
    startDate: Date = new Date();
    endDate: Date = new Date();

    constructor(private eventService: EventService) {
    }

    createEvent(): Subscription {
        const event = new Event(this.name, this.description, this.gameRoomId, this.startDate, this.endDate);
        return this.eventService.createEvent(event).subscribe(
            (response: Event) => {
                event.id = response.id;
                console.log('Nuovo evento creato con ID:', event.id);
            },
            (error: any) => {
                //TODO: Gestire l'errore: utente già presente e blablabla
                console.error('Errore durante la creazione dell\'evento:', error);
            }
        );
    }
}