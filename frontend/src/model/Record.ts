import { Player } from "./Player";
import { GameRoom } from "./GameRoom";
import { Game } from "./Game";

export class Record {
    player?: Player; // TODO: remove optional?
    gameRoom: GameRoom;
    game: Game;
    date: Date;
    score: number;
    isVerified: boolean;

    constructor(player: Player | undefined, gameRoom: GameRoom, game: Game, date: Date, score: number, isVerified: boolean) {
        this.player = player;
        this.gameRoom = gameRoom;
        this.game = game;
        this.date = date;
        this.score = score;
        this.isVerified = isVerified;
    }
}
