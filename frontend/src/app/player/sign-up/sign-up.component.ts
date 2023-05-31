import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError } from "rxjs";
import { HashService } from "../../hash.service";

import { Player } from "../../../model/Player";

@Component({
  selector: 'app-signup',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpPlayerComponent {

  email = "";
  password = "";
  token = "";
  playerId = "";

  disableButton = false;


  constructor(
      private http: HttpClient,
      private hashService: HashService
  ) {
  }

  signUp() {
    this.disableButton = true;
    let body = new Player("name", "surname", this.email, this.hashService.hashPassword(this.password));

    this.http.post('http://localhost:8080/player/signup', body).pipe(
        catchError((err) => {
          console.log(err);
          return new Observable();
        })
    ).subscribe((data: any) => {
      console.log(data);
      this.disableButton = false;
      this.token = data.token;
      this.playerId = data.playerId;
    });
  }
}