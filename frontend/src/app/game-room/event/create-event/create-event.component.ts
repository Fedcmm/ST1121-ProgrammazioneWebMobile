import { Component } from '@angular/core';
import { Event } from 'src/model/Event';
import { GameRoom } from "src/model/GameRoom";
import { EventService } from "src/service/event.service";
import { AuthInfoService } from "src/service/auth-info.service";
import { FormBuilder, FormGroup } from "@angular/forms";
import { HttpErrorResponse } from "@angular/common/http";

@Component({
    selector: 'game-room-create-event',
    templateUrl: './create-event.component.html',
    styleUrls: ['./create-event.component.css']
})

export class CreateEventComponent {

    newEventForm: FormGroup
    showError = false;
    errorMessage = '';


    constructor(
        private formBuilder: FormBuilder,
        private eventService: EventService,
        private authInfo: AuthInfoService,
    ) {
        this.newEventForm = formBuilder.group({
            name: '',
            description: '',
            startDate: '',
            endDate: ''
        });
    }


    createEvent() {
        if (this.newEventForm.invalid) {
            console.log("Invalid form")
            return;
        }

        let name = this.newEventForm.get('name')?.value;
        let description = this.newEventForm.get('description')?.value;
        let startDate = this.newEventForm.get('startDate')?.value;
        let endDate = this.newEventForm.get('endDate')?.value;

        let event = new Event(-1, name, description, this.authInfo.user as GameRoom, startDate, endDate);
        this.eventService.createEvent(event).subscribe({
            next: (response: Event) => {
                event.id = response.id;
                console.log('Nuovo evento creato con ID:', event.id);
            },
            error: (error) => {
                this.displayError(error)
            }
        });
    }

    private displayError(error: HttpErrorResponse) {
        this.showError = true;
        this.errorMessage = error.error;
        console.error(error);
    }
}