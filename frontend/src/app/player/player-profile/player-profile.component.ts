import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { Player } from "src/model/Player";
import { Record } from "src/model/Record";
import { PlayerService } from "src/service/player.service";
import { AuthInfoService } from "src/service/auth-info.service";

@Component({
    selector: 'app-player-profile',
    templateUrl: './player-profile.component.html',
    styleUrls: ['./player-profile.component.css']
})
export class PlayerProfileComponent implements OnInit {

    player?: Player;
    records: Record[] = [];
    isLoggedUser = false;


    constructor(
        private playerService: PlayerService,
        private authInfo: AuthInfoService,
        private router: Router,
        private route: ActivatedRoute
    ) {}


    ngOnInit() {
        let routeId = this.route.snapshot.paramMap.get("id");
        let id = routeId ? parseInt(routeId) : this.authInfo.user!.id;
        this.isLoggedUser = id === this.authInfo.user!.id;

        if (this.isLoggedUser) {
            this.player = this.authInfo.user as Player;
        } else {
            this.playerService.getPlayer(id).subscribe({
                next: (player: Player) => {
                    this.player = player;
                },
                error: console.error
            });
        }
        this.playerService.getRecords(id).subscribe({
            next: (records: Record[]) => {
                this.records = records;
            },
            error: console.error
        });
    }

    onRecordsReceived(records: Record[]) {
        this.records = records;
    }

    newRecord() {
        this.router.navigate(['/player/new-record']).catch(console.error);
    }
}
