import { Component } from '@angular/core';
import { AuthenticationInterceptor } from "../../util/authentication.interceptor";
import { FormBuilder, FormGroup } from "@angular/forms";
import { GameRoomService } from "../../../service/game-room.service";
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
        private router: Router
    ) {
        this.signInForm = this.formBuilder.group({
            username: '',
            password: ''
        });
    }

    signIn(): void {
        if (this.signInForm.invalid)
            return;

        const username = this.signInForm.get('username')?.value;
        const password = this.signInForm.get('password')?.value;

        this.gameRoomService.getSalt(username).subscribe({
            next: response => {
                this.gameRoomService.signIn(username, password, response.salt).subscribe({
                    next: ({ token }) => {
                        AuthenticationInterceptor.token = token;
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
