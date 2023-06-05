import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { Player } from "src/model/Player";
import { PlayerService } from "src/service/player.service";

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
    player?: Player
    
    
    constructor(
        private playerService: PlayerService,
        private route: ActivatedRoute
    ) {}
    
    
    ngOnInit() {
        let id = this.route.snapshot.paramMap.get("id");

        this.playerService.getPlayer(id ? parseInt(id) : undefined).subscribe({
            next: (player: Player) => {
                this.player = player;
            },
            error: console.error
        });
    }
}
