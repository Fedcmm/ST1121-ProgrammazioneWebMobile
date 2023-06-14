import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { Subscription } from "rxjs";
import { Event } from 'src/model/Event';
import { GameRoom } from "src/model/GameRoom";
import { EventService } from "src/service/event.service";
import { GameRoomService } from "src/service/game-room.service";

@Component({
    selector: 'app-create-event',
    templateUrl: './create-event.component.html',
    styleUrls: ['./create-event.component.css']
})

export class CreateEventComponent implements OnInit {
    gameRoom?: GameRoom;

    name: string = '';
    description: string = '';
    startDate: Date = new Date();
    endDate: Date = new Date();

    constructor(
        private gameRoomService: GameRoomService,
        private eventService: EventService,
        private route: ActivatedRoute
    ) { }

    ngOnInit() {
        let id: string | null = this.route.snapshot.paramMap.get("id");

        this.gameRoomService.getGameRoom(id ? parseInt(id) : undefined).subscribe({
            next: (gameRoom: GameRoom) => {
                this.gameRoom = gameRoom;
            },
            error: console.error
        });
    }

    createEvent(): Subscription {
        const event = new Event(-1, this.name, this.description, this.gameRoom?.id, this.startDate, this.endDate);

        return this.eventService.createEvent(event).subscribe({
            next: (response: Event) =>
            {
                event.id = response.id;
                console.log('Nuovo evento creato con ID:', event.id);
            },
            error: (error: any) => {
                //TODO: Gestire l'errore: evento già presente e bla bla bla
                console.error('Errore durante la creazione dell\'evento:', error);
            }
        });
    }
}