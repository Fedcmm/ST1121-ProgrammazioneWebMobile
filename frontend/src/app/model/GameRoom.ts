//TODO inserire i controlli nei set
import {Game} from "./Game";

export class GameRoom{
    private _id: Number;
    private _name: string;
    private _email: string;
    private _password: string;
    private _game: Array<Game>

    constructor(id: Number, name: string, email: string, password: string, game: Array<Game>) {
        this._id = id;
        this._name = name;
        this._email = email;
        this._password = password;
        this._game = game;
    }


    get id(): Number {
        return this._id;
    }

    set id(value: Number) {
        this._id = value;
    }

    get name(): string {
        return this._name;
    }

    set name(value: string) {
        this._name = value;
    }

    get email(): string {
        return this._email;
    }

    set email(value: string) {
        this._email = value;
    }

    get password(): string {
        return this._password;
    }

    set password(value: string) {
        this._password = value;
    }


    get game(): Array<Game> {
        return this._game;
    }

    set game(value: Array<Game>) {
        this._game = value;
    }
}