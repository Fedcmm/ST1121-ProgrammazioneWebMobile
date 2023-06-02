import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Game} from '../model/Game';

@Injectable({
    providedIn: 'root'
})
export class GameService {
    //TODO: mettere l'url giusto
    private apiUrl = 'url_da_cambiare';
    constructor(private http: HttpClient) {
    }

    getGames(gameRoomId: number): Observable<Game[]> {
        const url = `${this.apiUrl}?gameRoomId=${gameRoomId}`;
        return this.http.get<Game[]>(url);
    }

    getGame(gameId: number): Observable<Game> {
        const url = `${this.apiUrl}/${gameId}`;
        return this.http.get<Game>(url);
    }

    createGame(game: Game): Observable<Game> {
        const url = `${this.apiUrl}`;
        return this.http.post<Game>(url, game);
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
