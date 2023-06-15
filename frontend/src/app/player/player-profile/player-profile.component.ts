import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { Player } from "src/model/Player";
import { Record } from "src/model/Record";
import { PlayerService } from "src/service/player.service";
import { RecordService } from "src/service/record.service";
import { AuthInfoService } from "src/service/auth-info.service";

@Component({
    selector: 'app-player-profile',
    templateUrl: './player-profile.component.html',
    styleUrls: ['./player-profile.component.css']
})
export class PlayerProfileComponent implements OnInit {

    player?: Player;
    records: Record[] = [];


    constructor(
        private playerService: PlayerService,
        private recordService: RecordService,
        private authInfo: AuthInfoService,
        private router: Router,
        private route: ActivatedRoute
    ) {}


    ngOnInit() {
        let id = this.route.snapshot.paramMap.get("id");
        this.isLoggedUser = id ? parseInt(id) === this.authInfo.user!.id : true;

        this.playerService.getPlayer(id ? parseInt(id) : this.authInfo.user!.id).subscribe({
            next: (player: Player) => {
                this.player = player;
            },
            error: console.error
        });
        this.recordService.getPlayerRecords(id ? parseInt(id) : this.authInfo.user!.id).subscribe({
            next: (records: Record[]) => {
                this.records = records;
            },
            error: console.error
        });
    }

    onRecordsReceived(records: Record[]) {
        this.records = records;
    }
}
