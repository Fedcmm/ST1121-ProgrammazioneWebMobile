import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { AuthInfoService } from "src/service/auth-info.service";
import { FormBuilder, FormGroup } from "@angular/forms";
import { GameRoomService } from "src/service/game-room.service";
import { Router } from "@angular/router";

@Component({
  selector: 'game-room-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInGameRoomComponent {
    signInForm: FormGroup;

    constructor(
        private formBuilder: FormBuilder,
        private gameRoomService: GameRoomService,
        private router: Router,
        private http: HttpClient,
        private authInfo: AuthInfoService,
    ) {
        this.signInForm = this.formBuilder.group({
            username: '',
            password: ''
        });
    }

    signIn() {
        if (this.signInForm.invalid)
            return;

        const username = this.signInForm.get('email')?.value;
        const password = this.signInForm.get('password')?.value;

        this.gameRoomService.getSalt(username).subscribe({
            next: response => {
                this.gameRoomService.singIn(username, password, response.salt).subscribe({
                    next: ({ id, token }) => {
                        this.authInfo.accessToken = token;
                        this.router.navigate(['/player/profile']).catch(console.error);
                    },
                    error: error => {
                        // Errori vari: Password errata, username non esistente, ...
                    }
                });
            },
            error: error => {
                console.error(error)
            }
        })
    }
}
