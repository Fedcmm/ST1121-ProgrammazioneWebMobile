//TODO inserire i controlli nei set
export class GameRoom{
    private _id: Number;
    private _name: string;
    private _email: string;
    private _password: string;

    constructor(id: Number, name: string, email: string, password: string) {
        this._id = id;
        this._name = name;
        this._email = email;
        this._password = password;
    }


    get id(): Number {
        return this._id;
    }

    set id(value: Number) {
        this._id = value;
    }

    get name(): string {
        return this._name;
    }

    set name(value: string) {
        this._name = value;
    }

    get email(): string {
        return this._email;
    }

    set email(value: string) {
        this._email = value;
    }

    get password(): string {
        return this._password;
    }

    set password(value: string) {
        this._password = value;
    }
}