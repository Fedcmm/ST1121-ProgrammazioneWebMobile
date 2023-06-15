import { Password } from "src/service/hash.service";

export class Player {
    id: number;
    name: string;
    surname: string;
    username: string;
    email: string;
    password: string;
    passwordSalt: string;

    constructor(id: number, name: string, surname: string, username: string, email: string, password: Password) {
        this.id = id;
        this.name = name;
        this.surname = surname;
        this.username = username;
        this.email = email;
        this.password = password.passwordHash;
        this.passwordSalt = password.salt;
    }
}
