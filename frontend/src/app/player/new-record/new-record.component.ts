import {Component} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, catchError} from "rxjs";
import {HashService} from "../../hash.service";

import {Player} from "../../model/Player"
import {GameRoom} from "../../model/GameRoom"
import {Record} from "../../model/Record"
import {Game} from "../../model/Game";

@Component({
    selector: 'app-new-record',
    templateUrl: './new-record.component.html',
    styleUrls: ['./new-record.component.css']
})
export class NewRecordComponent {
    /*
    Il player è autenticato, come inserisco le sue informazioni?
    player =;
    */
    gameRoom = "";
    game = "";
    date: Date = new Date();
    score = "";

    disableButton = false;

    constructor(
        private http: HttpClient,
        private hashService: HashService
    ) {
    }
/*
    newRecord() {
        this.disableButton = true;
        let body = new Record(this.player, this.gameRoom, this.game, this.date, this.score, false)

        this.http.post('http://localhost:8080/record/new', body).pipe(
            catchError((err) => {
                console.log(err);
                return new Observable();
            })
        ).subscribe((data: any) => {
            console.log(data);
            this.disableButton = false;
        });
    }
    */

}
