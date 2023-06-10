import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from "@angular/forms";
import { PlayerService } from "src/service/player.service";
import { Router } from "@angular/router";
import { HashService } from "src/app/hash.service";

@Component({
    selector: 'app-signup',
    templateUrl: './sign-up.component.html',
    styleUrls: ['./sign-up.component.css']
})
export class SignUpPlayerComponent {
    signUpForm: FormGroup;


    constructor(
        private formBuilder: FormBuilder,
        private playerService: PlayerService,
        private hashService: HashService,
        private router: Router
    ) {
        this.signUpForm = this.formBuilder.group({
            name: '',
            surname: '',
            email: '',
            password: ''
        });
    }


    signUp() {
        if (this.signUpForm.invalid) {
            console.log("Invalid form")
            return;
        }

        const name = this.signUpForm.get('name')?.value;
        const surname = this.signUpForm.get('surname')?.value;
        const email = this.signUpForm.get('email')?.value;
        const password = this.hashService.hash(this.signUpForm.get('password')?.value);
        console.log(password)

        this.playerService.signUp(name, surname, email, password).subscribe({
            next: response => {
                this.router.navigate(['player/sign-in']).catch(console.error);
            },
            error: error => {
                console.error(error);
            }
        });
    }
}