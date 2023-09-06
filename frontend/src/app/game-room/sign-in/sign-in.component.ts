import { Component } from '@angular/core';
import { AuthInfoService } from "src/service/auth-info.service";
import { FormBuilder, FormGroup } from "@angular/forms";
import { GameRoomService } from "src/service/game-room.service";
import { Router } from "@angular/router";
import { GameRoom } from "src/model/GameRoom";
import { HttpErrorResponse } from "@angular/common/http";

@Component({
  selector: 'game-room-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInGameRoomComponent {

    signInForm: FormGroup;
    showError = false;
    errorMessage = '';


    constructor(
        private formBuilder: FormBuilder,
        private gameRoomService: GameRoomService,
        private authInfo: AuthInfoService,
        private router: Router,
    ) {
        this.signInForm = this.formBuilder.group({
            email: '',
            password: ''
        });
    }


    signIn() {
        if (this.signInForm.invalid)
            return;

        const email = this.signInForm.get('email')?.value;
        const password = this.signInForm.get('password')?.value;

        this.gameRoomService.getSalt(email).subscribe({
            next: response => {
                this.gameRoomService.singIn(email, password, response.salt).subscribe({
                    next: ({ id, token }) => {
                        this.authInfo.accessToken = token;
                        this.setUser(id);
                    },
                    error: error => {
                        this.displayError(error);
                    }
                });
            },
            error: error => {
                this.displayError(error);
            }
        })
    }

    private displayError(error: HttpErrorResponse) {
        this.showError = true;
        this.errorMessage = error.error;
        console.error(error);
    }

    private setUser(id: number) {
        this.gameRoomService.getGameRoom(id).subscribe({
            next: (user: GameRoom) => {
                this.authInfo.user = user;
                this.authInfo.userType = 'game-room';
                this.router.navigate(['/game-room/profile']).catch(console.error);
            },
            error: error => {
                this.displayError(error);
            }
        });
    }
}
