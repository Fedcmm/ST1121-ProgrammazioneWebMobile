import { Component } from '@angular/core';
import { GameRoomService } from "src/service/game-room.service";
import { HashService } from "src/service/hash.service";
import { Router } from "@angular/router";
import { FormBuilder, FormGroup } from "@angular/forms";

@Component({
    selector: 'game-room-sign-up',
    templateUrl: './sign-up.component.html',
    styleUrls: ['./sign-up.component.css']
})
export class SignUpGameRoomComponent {

    signUpForm: FormGroup;


    constructor(
        private formBuilder: FormBuilder,
        private hashService: HashService,
        private gameRoomService: GameRoomService,
        private router: Router
    ) {
        this.signUpForm = this.formBuilder.group({
            name: '',
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
        const email = this.signUpForm.get('email')?.value;
        const password = this.hashService.hash(this.signUpForm.get('password')?.value);

        this.gameRoomService.signUp(name, email, password).subscribe({
            next: () => {
                this.router.navigate(['game-room/sign-in']).catch(console.error);
            },
            error: error => {
                console.error(error);
            }
        });
    }
}