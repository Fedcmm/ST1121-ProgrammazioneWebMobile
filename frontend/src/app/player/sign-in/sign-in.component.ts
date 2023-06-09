import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
            username: ['', Validators.required],
            password: ['', Validators.required]
        });
    }

    signIn(): void {
        if (this.signInForm.invalid)
            return;

        const username = this.signInForm.get('username')?.value;
        const password = this.signInForm.get('password')?.value;

        this.playerService.signIn(username, password).subscribe({
            next: response => {
                AuthenticationInterceptor.token = response.token;
                this.router.navigate(['/player/profile']).catch(console.error);
            },
            error: error => {
                // Errori vari: Password errata, username non esistente, ...
            }
        });
    }
}