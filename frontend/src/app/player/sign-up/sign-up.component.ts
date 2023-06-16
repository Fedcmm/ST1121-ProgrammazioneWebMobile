import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from "@angular/forms";
import { PlayerService } from "src/service/player.service";
import { Router } from "@angular/router";
import { HashService } from "src/service/hash.service";
import { Player } from "src/model/Player";

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
            username: '',
            email: '',
            password: ''
        });
    }


    signUp() {
        if (this.signUpForm.invalid) {
            console.log("Invalid form")
            return;
        }

        let name = this.signUpForm.get('name')?.value;
        let surname = this.signUpForm.get('surname')?.value;
        let username = this.signUpForm.get('username')?.value;
        let email = this.signUpForm.get('email')?.value;
        let password = this.hashService.hash(this.signUpForm.get('password')?.value);

        let player = new Player(-1, name, surname, username, email, password)
        this.playerService.signUp(player).subscribe({
            next: () => {
                this.router.navigate(['player/sign-in']).catch(console.error);
            },
            error: error => {
                console.error(error);
            }
        });
    }
}