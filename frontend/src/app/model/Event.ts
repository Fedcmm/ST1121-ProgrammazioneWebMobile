//TODO inserire i controlli nei set
import {GameRoom} from "./GameRoom";

export class Event{
    private _id: Number;
    private _name: string;
    private _description: string;
    private _gameRoom: Array<GameRoom>;
    private _startDate: Date;
    private _endDate: Date;

    constructor(id: Number, name: string, description: string, gameRoom: Array<GameRoom>, startDate: Date, endDate: Date) {
        this._id = id;
        this._name = name;
        this._description = description;
        this._gameRoom = gameRoom;
        this._startDate = startDate;
        this._endDate = endDate;
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

    get description(): string {
        return this._description;
    }

    set description(value: string) {
        this._description = value;
    }

    get gameRoom(): Array<GameRoom> {
        return this._gameRoom;
    }

    set gameRoom(value: Array<GameRoom>) {
        this._gameRoom = value;
    }

    get startDate(): Date {
        return this._startDate;
    }

    set startDate(value: Date) {
        this._startDate = value;
    }

    get endDate(): Date {
        return this._endDate;
    }

    set endDate(value: Date) {
        this._endDate = value;
    }
}