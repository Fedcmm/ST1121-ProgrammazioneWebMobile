//TODO inserire i controlli nei set
import { Password } from "../app/hash.service";

export class Player {
    id: number;
    name: string;
    surname: string;
    email: string;
    password: string;
    passwordSalt: string;

    constructor(id: number, name: string, surname: string, email: string, password: Password) {
        this.id = id;
        this.name = name;
        this.surname = surname;
        this.email = email;
        this.password = password.passwordHash;
        this.passwordSalt = password.salt;
    }
}
