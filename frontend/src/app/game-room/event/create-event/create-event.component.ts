import {Component} from '@angular/core';
import {HttpClient} from "@angular/common/http";
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
    gameRoomId: number = 0;
    startDate: Date = new Date();
    endDate: Date = new Date();

    constructor(private http: HttpClient) {
    }

    createEvent(): Subscription {
        let eventService: EventService = new EventService(this.http);
        const event = new Event(this.name, this.description, this.gameRoomId, this.startDate, this.endDate)
        return eventService.createEvent(event).subscribe();
    }

    protected readonly Number = Number;
}