import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HashService } from "../../hash.service";

import { Player } from "../../../model/Player";

@Component({
    selector: 'app-signup',
    templateUrl: './sign-up.component.html',
    styleUrls: ['./sign-up.component.css']
})
export class SignUpPlayerComponent {

    name = "";
    surname = "";
    email = "";
    password = "";
    playerId = "";

    disableButton = false;


    constructor(
        private http: HttpClient,
        private hashService: HashService
    ) {}

    signUp() {
        this.disableButton = true;
        let body = new Player(-1, this.name, this.surname, this.email, this.hashService.hash(this.password));

        this.http.post('http://localhost:8080/player/signup', body).subscribe({
            next: (data: any) =>
            {
                console.log(data);
                this.disableButton = false;
                this.playerId = data.playerId;
            },
            error: (error: any) => {
                console.error(error);
                this.disableButton = false;
            }
        });
    }
}