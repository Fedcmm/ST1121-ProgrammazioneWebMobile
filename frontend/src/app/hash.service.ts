import { Injectable } from '@angular/core';
import * as bcrypt from 'bcryptjs';

@Injectable({
    providedIn: 'root'
})
export class HashService {

    constructor() { }

    hash(password: string): Password {
        return new Password(password);
    }

    hashWithSalt(password: string, salt: string): string {
        return bcrypt.hashSync(password, salt);
    }
}

export class Password {
    salt: string;
    passwordHash: string;

    constructor(password: string) {
        this.salt = bcrypt.genSaltSync(8);
        this.passwordHash = bcrypt.hashSync(password, this.salt);
    }
}
