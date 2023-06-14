import { Password } from "src/service/hash.service";
import { Game } from "./Game";
import { Event } from "./Event";

export class GameRoom {
    id: number;
    name: string;
    email: string;
    password: string;
    passwordSalt: string;
    games: Array<Game>;
    events: Array<Event>;

    constructor(id: number, name: string, email: string, password: Password, games?: Array<Game>, events?: Array<Event>) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password.passwordHash;
        this.passwordSalt = password.salt;
        this.games = games ? games : [];
        this.events = events ? events : [];
    }
}
