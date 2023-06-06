import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { PlayerService} from "src/service/player.service";;

@Component({
    selector: 'app-signup',
    templateUrl: './sign-up.component.html',
    styleUrls: ['./sign-up.component.css']
})
export class SignUpPlayerComponent {
    signUpForm: FormGroup;

    constructor(
        private formBuilder: FormBuilder,
        private playerService: PlayerService
    ) {
        this.signUpForm = this.formBuilder.group({
            name: ['', Validators.required],
            surname: ['', Validators.required],
            email: ['', Validators.required],
            password: ['', Validators.required]
        });
    }

    signUp(){
        if (this.signUpForm.invalid) {
            return;
        }

        const name = this.signUpForm.get('name')?.value;
        const surname = this.signUpForm.get('surname')?.value;
        const email = this.signUpForm.get('email')?.value;
        const password = this.signUpForm.get('password')?.value;

        this.playerService.signUp(name, surname,email, password).subscribe(
            response => {
                // restituisco la sessione
            },
            error => {
                // Errori vari: Password errata, username non esistente, ...
            }
        );
    }
}