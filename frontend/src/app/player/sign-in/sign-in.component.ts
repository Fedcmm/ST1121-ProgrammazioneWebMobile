import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PlayerService } from "src/service/player.service";

@Component({
    selector: 'app-sign-in',
    templateUrl: './sign-in.component.html',
    styleUrls: ['./sign-in.component.css']
})
export class SignInPlayerComponent {
    signInForm: FormGroup;

    constructor(
        private formBuilder: FormBuilder,
        private playerService: PlayerService
    ) {
        this.signInForm = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });
    }

    signIn(): void {
        if (this.signInForm.invalid) {
            return;
        }
        const username = this.signInForm.get('username')?.value;
        const password = this.signInForm.get('password')?.value;

        this.playerService.signIn(username, password).subscribe(
            response => {
                // restituisco la sessione
            },
            error => {
                // Errori vari: Password errata, username non esistente, ...
            }
        );
    }
}
