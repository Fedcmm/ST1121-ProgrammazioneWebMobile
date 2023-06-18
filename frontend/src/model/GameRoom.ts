import { Password } from "src/service/hash.service";
import { Game } from "./Game";

export class GameRoom {
    id: number;
    name: string;
    email: string;
    password: string;
    passwordSalt: string;
    games: Game[];

    constructor(id: number, name: string, email: string, password: Password, games?: Game[]) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password.passwordHash;
        this.passwordSalt = password.salt;
        this.games = games ? games : [];
    }

    get username(): string {
        return this.name;
    }
}
