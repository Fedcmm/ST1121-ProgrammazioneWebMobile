import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PlayerService } from "src/service/player.service";
import { Router } from "@angular/router";
import { AuthenticationInterceptor } from "../../util/authentication.interceptor";

@Component({
    selector: 'app-sign-in',
    templateUrl: './sign-in.component.html',
    styleUrls: ['./sign-in.component.css']
})
export class SignInPlayerComponent {
    signInForm: FormGroup;

    constructor(
        private formBuilder: FormBuilder,
        private playerService: PlayerService,
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
                        AuthenticationInterceptor.token = token;
                        this.setUser(id);
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

    private setUser(id: number) {
        this.playerService.getPlayer(id).subscribe({
            next: user => {
                AuthenticationInterceptor.user = user;
            },
            error: error => {
                console.error(error);
            }
        });
    }
}
