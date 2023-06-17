import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PlayerService } from "src/service/player.service";
import { Router } from "@angular/router";
import { Player } from "src/model/Player";
import { AuthInfoService } from "src/service/auth-info.service";
import { HttpErrorResponse } from "@angular/common/http";

@Component({
    selector: 'game-room-sign-in',
    templateUrl: './sign-in.component.html',
    styleUrls: ['./sign-in.component.css']
})
export class SignInPlayerComponent {

    signInForm: FormGroup;

    showError = false;
    errorMessage = '';


    constructor(
        private formBuilder: FormBuilder,
        private playerService: PlayerService,
        private authInfo: AuthInfoService,
        private router: Router
    ) {
        this.signInForm = this.formBuilder.group({
            username: '',
            password: ''
        });
    }

    signIn() {
        if (this.signInForm.invalid)
            return;

        const username = this.signInForm.get('username')?.value;
        const password = this.signInForm.get('password')?.value;

        this.playerService.getSalt(username).subscribe({
            next: response => {
                this.playerService.signIn(username, password, response.salt).subscribe({
                    next: ({ id, token }) => {
                        this.authInfo.accessToken = token;
                        this.showError = false;
                        this.setUser(id);
                    },
                    error: error => {
                        this.displayError(error)
                    }
                });
            },
            error: error => {
                this.displayError(error)
            }
        })
    }

    private setUser(id: number) {
        this.playerService.getPlayer(id).subscribe({
            next: (user: Player) => {
                this.authInfo.user = user;
                this.authInfo.userType = 'player';
                this.router.navigate(['/player/profile']).catch(console.error);
            },
            error: error => {
                this.displayError(error)
            }
        });
    }

    private displayError(error: HttpErrorResponse) {
        this.errorMessage = error.error;
        this.showError = true;
        console.error(error)
    }
}
