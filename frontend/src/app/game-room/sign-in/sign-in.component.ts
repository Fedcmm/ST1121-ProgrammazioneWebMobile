import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError } from "rxjs";
import { HashService } from "../../hash.service";

import { GameRoom} from "../../model/GameRoom";

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInGameRoomComponent {

      email = "";
      password = "";
      //Non so se serve e se serve non so quell che devo fare:(
      token = "";
      disableButton = false;

  constructor(
      private http: HttpClient,
      private hashService: HashService
  ) {
  }

    signIn() {
        this.disableButton = true;
        let body = new GameRoom("name", this.email, this.hashService.hashPassword(this.password));

        this.http.post('http://localhost:8080/gameroom/signin', body).pipe(
            catchError((err) => {
                console.log(err);
                return new Observable();
            })
        ).subscribe((data: any) => {
            console.log(data);
            this.disableButton = false;
            this.token = data.token;
            this.email = data.email;
            this.password = data.password;
        });
    }
}
