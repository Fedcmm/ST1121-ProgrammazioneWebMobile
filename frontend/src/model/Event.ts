//TODO inserire i controlli nei set
import {GameRoom} from "./GameRoom";

export class Event{
    private _id: number;
    private _name: string;
    private _description: string;
    private _gameRoomId: number;
    private _startDate: Date;
    private _endDate: Date;

    constructor(name: string, description: string, gameRoom: number, startDate: Date, endDate: Date) {
        this._id = 0;
        this._name = name;
        this._description = description;
        this._gameRoomId = gameRoom;
        this._startDate = startDate;
        this._endDate = endDate;
    }

    get id(): number {
        return this._id;
    }

    set id(value: number) {
        this._id = value;
    }

    get gameRoomId(): number {
        return this._gameRoomId;
    }

    set gameRoomId(value: number) {
        this._gameRoomId = value;
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

    get gameRoom(): number {
        return this._gameRoomId;
    }

    set gameRoom(value: number) {
        this._gameRoomId = value;
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