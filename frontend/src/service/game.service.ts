import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Game } from 'src/model/Game';

@Injectable({
    providedIn: 'root'
})
//TODO: Delete?
export class GameService {

    private apiUrl = 'http://localhost:8080/game';


    constructor(
        private http: HttpClient
    ) {}


    getGame(gameId: number): Observable<Game> {
        const url = `${this.apiUrl}/${gameId}`;
        return this.http.get<Game>(url);
    }

    getGames(): Observable<Game[]> {
        const url = `${this.apiUrl}/all`;
        return this.http.get<Game[]>(url);
    }

    createGame(game: Game): Observable<Game> {
        const url = `${this.apiUrl}/`;
        return this.http.post<Game>(url, game);
    }

    addGame(gameId: number, gameRoomId: number): Observable<Game> {
        const url = `${this.apiUrl}/${gameId}/${gameRoomId}`;
        return this.http.post<Game>(url, null);
    }

    updateGame(game: Game): Observable<Game> {
        const url = `${this.apiUrl}/${game.id}`;
        return this.http.put<Game>(url, game);
    }

    deleteGame(gameId: number): Observable<Game> {
        const url = `${this.apiUrl}/${gameId}`;
        return this.http.delete<Game>(url);
    }
}
