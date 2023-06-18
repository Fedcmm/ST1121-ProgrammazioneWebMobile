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
    title = 'view-game';

    game?: Game;

    constructor(
        private gameService: GameService,
        private router: Router,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        const gameId = this.route.snapshot.paramMap.get('id');

        this.gameService.getGame(parseInt(gameId!))
            .subscribe(
                game => {
                    this.game = game;
                }
            );
    }
}
