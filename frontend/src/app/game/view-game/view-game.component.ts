import { Component, OnInit } from '@angular/core';
import { GameService } from "src/service/game.service";
import { Game } from "src/model/Game";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
    selector: 'app-view-game',
    templateUrl: './view-game.component.html',
    styleUrls: ['./view-game.component.css']
})
export class ViewGameComponent implements OnInit {

    game?: Game;


    constructor(
        private gameService: GameService,
        private router: Router,
        private route: ActivatedRoute
    ) {}


    ngOnInit() {
        let gameId = this.route.snapshot.paramMap.get('id')!;

        this.gameService.getGame(parseInt(gameId))
            .subscribe({
                next: game => {
                    this.game = game;
                },
                error: error => {
                    console.error(error);
                }
            });
    }
}
