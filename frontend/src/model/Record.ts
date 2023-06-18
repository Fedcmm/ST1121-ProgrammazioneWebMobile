import { Player } from "./Player";
import { GameRoom } from "./GameRoom";
import { Game } from "./Game";

export class Record {
    id: number;
    player: Player;
    gameRoom: GameRoom;
    game: Game;
    date: Date;
    score: number;
    isVerified: boolean;

    constructor(id: number, player: Player, gameRoom: GameRoom, game: Game, date: Date, score: number, isVerified: boolean) {
        this.id = id;
        this.player = player;
        this.gameRoom = gameRoom;
        this.game = game;
        this.date = date;
        this.score = score;
        this.isVerified = isVerified;
    }
}
