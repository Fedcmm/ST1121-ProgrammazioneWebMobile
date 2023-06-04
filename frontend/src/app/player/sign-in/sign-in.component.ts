import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from "@angular/router";
import { HashService } from "../../hash.service";

import { AuthenticationInterceptor } from "../../util/authentication.interceptor";

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})

export class SignInPlayerComponent {

    email = "";
    password = "";

    disableButton = false;

    constructor(
        private http: HttpClient,
        private hashService: HashService,
        private router: Router
    ) {}

    signIn() {
        this.disableButton = true;
        let body = {
            email: this.email,
            password: this.hashService.hash(this.password)
        };

        this.http.post('http://localhost:8080/player/login', body)
            .subscribe({
                next: (data: any) => {
                    console.log(data);
                    AuthenticationInterceptor.token = data.token;
                    this.disableButton = false;

                    this.router.navigate(['/player/profile']).catch(console.error);
                },
                error: (error: any) => {
                    console.error(error);
                    this.disableButton = false;
                }
            }
        );
    }
}
