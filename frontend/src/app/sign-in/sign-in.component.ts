import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError } from "rxjs";
import { HashService } from "../hash.service";

import { Player } from "../model/Player";
@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})

export class SignInComponent {
    name = "";
    surname = "";
    email = "";
    password = "";

    disableButton = false;
    constructor(
        private http: HttpClient,
        private hashService: HashService
    ) {
    }

    signin() {
        this.disableButton = true;
        let body = new Player("name", "surname", this.email, this.hashService.hashPassword(this.password));

        this.http.post('http://localhost:8080/player/signin', body).pipe(
            catchError((err) => {
                console.log(err);
                return new Observable();
            })
        ).subscribe((data: any) => {
            console.log(data);
            this.disableButton = false;
            this.email = data.email;
            this.password = data.password;
        });
    }
}
