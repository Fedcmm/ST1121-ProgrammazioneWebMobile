import { Component } from '@angular/core';
import { Event } from 'src/model/Event';
import { GameRoom } from "src/model/GameRoom";
import { EventService } from "src/service/event.service";
import { AuthInfoService } from "src/service/auth-info.service";

@Component({
    selector: 'game-room-create-event',
    templateUrl: './create-event.component.html',
    styleUrls: ['./create-event.component.css']
})

export class CreateEventComponent {

    name = '';
    description = '';
    startDate = new Date();
    endDate = new Date();


    constructor(
        private eventService: EventService,
        private authInfo: AuthInfoService,
    ) {}


    createEvent() {
        let event = new Event(-1, this.name, this.description, this.authInfo.user as GameRoom, this.startDate, this.endDate);

        this.eventService.createEvent(event).subscribe({
            next: (response: Event) => {
                event.id = response.id;
                console.log('Nuovo evento creato con ID:', event.id);
            },
            error: (error) => {
                //TODO: Gestire l'errore: evento già presente e bla bla bla
                console.error('Errore durante la creazione dell\'evento:', error);
            }
        });
    }
}