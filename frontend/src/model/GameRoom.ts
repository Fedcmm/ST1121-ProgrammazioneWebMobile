import { Password } from "src/service/hash.service";

export class GameRoom {
    id: number;
    name: string;
    email: string;
    password: string;
    passwordSalt: string;

    constructor(id: number, name: string, email: string, password: Password) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password.passwordHash;
        this.passwordSalt = password.salt;
    }

    get username(): string {
        return this.name;
    }
}
