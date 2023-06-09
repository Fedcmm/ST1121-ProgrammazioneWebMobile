import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map, Observable} from 'rxjs';
import {HashService} from "src/app/hash.service";
import {Game} from 'src/model/Game';

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


    getGames(): Observable<Game[]> {
        const url = `${this.apiUrl}/games`;
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

    navigateToGameProfile(gameId: number): void {
        // Implementa la logica per reindirizzare alla pagina del profilo del game
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
