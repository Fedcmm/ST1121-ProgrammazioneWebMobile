//TODO inserire i controlli nei set
import {GameType} from "./GameType";

export class Game {
    private _id: number;
    private _name: string;
    private _description: string;
    private _gameType: Array<GameType>;

    constructor(id: number, name: string, description: string, gameType: Array<GameType>) {
        this._id = id;
        this._name = name;
        this._description = description;
        this._gameType = gameType;
    }

    get id(): number {
        return this._id;
    }

    set id(value: number) {
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


    get gameType(): Array<GameType> {
        return this._gameType;
    }

    set gameType(value: Array<GameType>) {
        this._gameType = value;
    }
}