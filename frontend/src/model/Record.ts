//TODO inserire i controlli nei set
import {Player} from "./Player";
import {GameRoom} from "./GameRoom";
import {Game} from "./Game";

export class Record{
    private _player: Player;
    private _gameRoom: GameRoom;
    private _game: Game;
    private _date: Date;
    private _score: Number;
    private _isVerified: boolean;


    constructor(player: Player, gameRoom: GameRoom, game: Game, date: Date, score: Number, isVerified: boolean) {
        this._player = player;
        this._gameRoom = gameRoom;
        this._game = game;
        this._date = date;
        this._score = score;
        this._isVerified = isVerified;
    }


    get player(): Player {
        return this._player;
    }

    set player(value: Player) {
        this._player = value;
    }

    get gameRoom(): GameRoom {
        return this._gameRoom;
    }

    set gameRoom(value: GameRoom) {
        this._gameRoom = value;
    }

    get game(): Game {
        return this._game;
    }

    set game(value: Game) {
        this._game = value;
    }

    get date(): Date {
        return this._date;
    }

    set date(value: Date) {
        this._date = value;
    }

    get score(): Number {
        return this._score;
    }

    set score(value: Number) {
        this._score = value;
    }

    get isVerified(): boolean {
        return this._isVerified;
    }

    set isVerified(value: boolean) {
        this._isVerified = value;
    }
}