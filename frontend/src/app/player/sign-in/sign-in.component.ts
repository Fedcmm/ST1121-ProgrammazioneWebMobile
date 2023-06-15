import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PlayerService } from "src/service/player.service";
import { Router } from "@angular/router";
import { Player } from "src/model/Player";
import { AuthInfoService } from "src/service/auth-info.service";

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
        this.playerService.getPlayer(id).subscribe({
            next: (user: Player) => {
                this.authInfo.user = user;
                this.router.navigate(['/player/profile']).catch(console.error);
            },
            error: error => {
                console.error(error);
            }
        });
    }
}
