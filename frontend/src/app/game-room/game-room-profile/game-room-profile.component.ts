import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { GameRoom } from "src/model/GameRoom";
import { Event } from "src/model/Event";
import { Record } from "src/model/Record";

import { GameRoomService } from "src/service/game-room.service";
import { AuthInfoService } from "src/service/auth-info.service";

@Component({
    selector: 'game-room-profile',
    templateUrl: './game-room-profile.component.html',
    styleUrls: ['./game-room-profile.component.css']
})
export class GameRoomProfileComponent implements OnInit {

    gameRoom?: GameRoom;
    recordsLength = 0;
    events: Event[] = [];
    isLoggedUser = false;

    constructor(
        private gameRoomService: GameRoomService,
        private authInfo: AuthInfoService,
        private router: Router,
        private route: ActivatedRoute
    ) {}


    ngOnInit() {
        let routeId = this.route.snapshot.paramMap.get("id");
        let id = routeId ? parseInt(routeId) : this.authInfo.user!.id;
        this.isLoggedUser = id === this.authInfo.user!.id;

        if (this.isLoggedUser) {
            this.gameRoom = this.authInfo.user as GameRoom;
        } else {
            this.gameRoomService.getGameRoom(id).subscribe({
                next: (gameRoom: GameRoom) => {
                    this.gameRoom = gameRoom;
                },
                error: console.error
            });
        }
        this.gameRoomService.getRecords(id).subscribe({
            next: (records: Record[]) => {
                this.recordsLength = records.length;
            },
            error: console.error
        });
        this.gameRoomService.getEvents(id).subscribe({
            next: (events: Event[]) => {
                this.events = events;
            },
            error: console.error
        });
    }

    onEventsReceived(events: Event[]) {
        this.events = events;
    }

    createEvent() {
        this.router.navigate(['/game-room/create-event']).catch(console.error);
    }
}
