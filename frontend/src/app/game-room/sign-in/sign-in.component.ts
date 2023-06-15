import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { HashService } from "src/service/hash.service";
import { AuthInfoService } from "src/service/auth-info.service";

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
        private authInfo: AuthInfoService,
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
                this.authInfo.accessToken = data.token;
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
