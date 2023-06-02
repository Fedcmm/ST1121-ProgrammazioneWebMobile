import {Game} from "./Game";

export class GamesOfGameRoom {
    private _games: Array<Game>;

    constructor(games: Array<Game>) {
        this._games = games;
    }

    get games(): Array<Game> {
        return this._games;
    }

    set games(value: Array<Game>) {
        this._games = value;
    }
}