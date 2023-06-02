//TODO inserire i controlli nei set
import {Player} from "./Player";
import {GameRoom} from "./GameRoom";
import {Game} from "./Game";

export class Record{
    private _player: number;
    private _gameRoom: number;
    private _game: number;
    private _date: Date;
    private _score: number;
    private _isVerified: boolean;


    constructor(player: number, gameRoom: number, game: number, date: Date, score: number, isVerified: boolean) {
        this._player = player;
        this._gameRoom = gameRoom;
        this._game = game;
        this._date = date;
        this._score = score;
        this._isVerified = isVerified;
    }


    get player(): number {
        return this._player;
    }

    set player(value: number) {
        this._player = value;
    }

    get gameRoom(): number {
        return this._gameRoom;
    }

    set gameRoom(value: number) {
        this._gameRoom = value;
    }

    get game(): number {
        return this._game;
    }

    set game(value: number) {
        this._game = value;
    }

    get date(): Date {
        return this._date;
    }

    set date(value: Date) {
        this._date = value;
    }

    get score(): number {
        return this._score;
    }

    set score(value: number) {
        this._score = value;
    }

    get isVerified(): boolean {
        return this._isVerified;
    }

    set isVerified(value: boolean) {
        this._isVerified = value;
    }
}