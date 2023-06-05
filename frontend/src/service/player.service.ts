import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Player } from '../model/Player';

@Injectable({
    providedIn: 'root'
})
export class PlayerService {
    // TODO: mettere l'url giusto
    private apiUrl = 'url_da_cambiare';


    constructor(private http: HttpClient) {
    }


    getPlayers(gameRoomId: number): Observable<Player[]> {
        const url = `${this.apiUrl}?gameRoomId=${gameRoomId}`;
        return this.http.get<Player[]>(url);
    }

    getPlayer(playerId: number): Observable<Player> {
        const url = `${this.apiUrl}/${playerId}`;
        return this.http.get<Player>(url);
    }

    getPlayerName(playerId: number): string {
        // Implementa la logica per ottenere il nome del player dal suo ID
        return "Player Name";
    }

    navigateToPlayerProfile(playerId: number): void {
        // Implementa la logica per reindirizzare alla pagina del profilo del player
    }


    createPlayer(player: Player): Observable<Player> {
        const url = `${this.apiUrl}`;
        return this.http.post<Player>(url, player);
    }

    updatePlayer(player: Player): Observable<Player> {
        const url = `${this.apiUrl}/${player.id}`;
        return this.http.put<Player>(url, player);
    }

    deletePlayer(playerId: number): Observable<Player> {
        const url = `${this.apiUrl}/${playerId}`;
        return this.http.delete<Player>(url);
    }
}