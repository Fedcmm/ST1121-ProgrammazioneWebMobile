import {GameRoom} from "./GameRoom";
import {Game} from "./Game";

export class GamesOfGameRoom{
    private _gameRoom: GameRoom;
    private _games: Array<Game>;

    constructor(gameRoom: GameRoom, games: Array<Game>) {
        this._gameRoom = gameRoom;
        this._games = games;
    }


    get gameRoom(): GameRoom {
        return this._gameRoom;
    }

    set gameRoom(value: GameRoom) {
        this._gameRoom = value;
    }

    get games(): Array<Game> {
        return this._games;
    }

    set games(value: Array<Game>) {
        this._games = value;
    }
}