import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'app-new-record',
    templateUrl: './new-record.component.html',
    styleUrls: ['./new-record.component.css']
})
export class NewRecordComponent implements OnInit {
    gameRooms: string[] = [];
    selectedGameRoom: string = '';
    games: string[] = [];
    selectedGame: string = '';
    score: number = 0;
    date: Date = new Date()

    constructor(private http: HttpClient) {}

    ngOnInit(): void {
        this.getGameRooms();
    }

    getGameRooms(): void {
        //Non mi quadra
        this.http.get<string[]>('http://localhost:4200/gameroom/all').subscribe(
            response => {
                this.gameRooms = response;
            },
            error => {
                console.error('Error getting game rooms:', error);
            }
        );
    }

    getGames(): void {
        this.http.get<string[]>('http://localhost:4200/gameroom/{id}/games' + this.selectedGameRoom).subscribe(
            response => {
                this.games = response;
            },
            error => {
                console.error('Error getting games:', error);
            }
        );
    }

    saveRecord(): void {
        const record = {
            gameRoom: this.selectedGameRoom,
            game: this.selectedGame,
            score: this.score
        };

        this.http.post('url_del_backend/salva_record', record).subscribe(
            () => {
                console.log('Record salvato.');
            },
            error => {
                console.error('Errore: ', error);
                // Eh, mo qua ti voglio vedere a gestire l'errore.
            }
        );
    }
}
