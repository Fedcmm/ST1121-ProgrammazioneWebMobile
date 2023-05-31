import {Component} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, catchError} from "rxjs";
import {HashService} from "../../hash.service";

import {GameRoom} from "../../../model/GameRoom"

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
        let body = new GameRoom("name", this.email, this.hashService.hashPassword(this.password));

        this.http.post('http://localhost:8080/gameRoom/signup', body).pipe(
            catchError((err) => {
                console.log(err);
                return new Observable();
            })
        ).subscribe((data: any) => {
            console.log(data);
            this.disableButton = false;
        });
    }

}