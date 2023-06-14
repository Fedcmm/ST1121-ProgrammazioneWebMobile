import { GameType } from "./GameType";

export class Game {
    id: number;
    name: string;
    description: string;
    gameTypes: Array<GameType>;

    constructor(id: number, name: string, description: string, gameTypes: Array<GameType>) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.gameTypes = gameTypes;
    }
}
