//TODO inserire i controlli nei set
export class Player {
    private _name: string;
    private _surname: string;
    private _email: string;
    private _password: string;


    constructor(name: string, surname: string, email: string, password: string) {
        this._name = name;
        this._surname = surname;
        this._email = email;
        this._password = password;
    }

    get name(): string {
        return this._name;
    }

    set name(value: string) {
        if (value == null || value == "" || value == undefined) {
            throw new Error("Name cannot be empty");
        }
        this._name = value;
    }

    get surname(): string {
        return this._surname;
    }

    set surname(value: string) {
        if (value == null || value == "" || value == undefined) {
            throw new Error("Surname cannot be empty");
        }
        this._surname = value;
    }

    get email(): string {
        return this._email;
    }

    set email(value: string) {
        if (value == null || value == "" || value == undefined) {
            throw new Error("Surname cannot be empty");
        }
        this._email = value;
    }

    get password(): string {
        return this._password;
    }

    set password(value: string) {
        if (value == null || value == "" || value == undefined) {
            throw new Error("Surname cannot be empty");
        }
        this._password = value;
    }
}