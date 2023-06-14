import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Game } from 'src/model/Game';

@Injectable({
    providedIn: 'root'
})
export class GameService {
    //TODO: mettere l'url giusto
    private apiUrl = 'url_da_cambiare';


    constructor(
        private http: HttpClient
    ) {
    }


    getGames(gameRoomId: number | undefined): Observable<Game[]> {
        const url = `${this.apiUrl}/${gameRoomId}/games`;
        return this.http.get<Game[]>(url);
    }

    getGame(gameId: number): Observable<Game> {
        const url = `${this.apiUrl}/${gameId}`;
        return this.http.get<Game>(url);
    }

    getGameName(gameId: number): string {
        let name = "";
        this.getGame(gameId).subscribe({
            next: (game) => {
                name = game.name
            }
        });

        return name;
    }


    //TODO: Aggiungere al backend
    getGameRoomGames(gameRoomId: number | undefined): Observable<Game[]> {
        return this.http.get<Game[]>(`${this.apiUrl}/games/${gameRoomId}`);
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
