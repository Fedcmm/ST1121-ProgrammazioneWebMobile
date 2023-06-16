import { Component } from '@angular/core';
import { AuthInfoService } from "src/service/auth-info.service";
import { FormBuilder, FormGroup } from "@angular/forms";
import { GameRoomService } from "src/service/game-room.service";
import { Router } from "@angular/router";
import { GameRoom } from "src/model/GameRoom";

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
        private authInfo: AuthInfoService,
        private router: Router,
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
                        this.setUser(id);
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

    private setUser(id: number) {
        this.gameRoomService.getGameRoom(id).subscribe({
            next: (user: GameRoom) => {
                this.authInfo.user = user;
                this.router.navigate(['/game-room/profile']).catch(console.error);
            },
            error: error => {
                console.error(error);
            }
        });
    }
}
