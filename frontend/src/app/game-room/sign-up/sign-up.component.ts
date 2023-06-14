import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { GameRoom } from "src/model/GameRoom"
import { HashService } from "src/service/hash.service";

@Component({
    selector: 'app-sign-up',
    templateUrl: './sign-up.component.html',
    styleUrls: ['./sign-up.component.css']
})
export class SignUpGameRoomComponent {

    email = "";
    password = "";
    confirmPassword = "";

    disableButton = false;

    constructor(
        private http: HttpClient,
        private hashService: HashService
    ) {
    }

    confirmedPassword() {
        return this.password === this.confirmPassword;
    }

    signUp() {
        this.disableButton = true;
        let body = new GameRoom(-1, "name", this.email, this.hashService.hash(this.password));

        this.http.post('http://localhost:8080/gameRoom/signup', body).subscribe({
            next: (data: any) => {
                console.log(data);
                this.disableButton = false;
            },
            error: (error: any) => {
                console.error(error);
                this.disableButton = false;
            }
        });
    }
}