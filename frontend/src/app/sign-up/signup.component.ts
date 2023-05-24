import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError } from "rxjs";
import { HashService } from "../hash.service";

import { Player } from "../model/Player";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {

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

  signup() {
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