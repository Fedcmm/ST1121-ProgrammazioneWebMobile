import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { HashService } from "src/service/hash.service";
import { AuthenticationInterceptor } from "src/app/util/authentication.interceptor";

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInGameRoomComponent {

    email= "";
    password= "";

    disableButton= false;

    constructor(
        private http: HttpClient,
        private hashService: HashService
    ) {
    }

    signIn() {
        this.disableButton = true;
        let body= {
            email: this.email,
            password: this.hashService.hash(this.password)
        };

        this.http.post('http://localhost:8080/gameroom/login', body).subscribe({
            next: (data: any) => {
                console.log(data);
                AuthenticationInterceptor.token = data.token;
                this.disableButton = false;

                this.email = data.email;
                this.password = data.password;
            },
            error: (error: any) => {
                console.error(error);
                this.disableButton = false;
            }
        });
    }
}
