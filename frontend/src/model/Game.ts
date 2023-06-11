//TODO inserire i controlli nei set
import { GameType } from "./GameType";

export class Game {
    id: number;
    name: string;
    description: string;
    gameType: Array<GameType>;

    constructor(id: number, name: string, description: string, gameType: Array<GameType>) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.gameType = gameType;
    }
}
