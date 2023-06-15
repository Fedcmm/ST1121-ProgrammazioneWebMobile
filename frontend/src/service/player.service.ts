import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Player } from 'src/model/Player';
import { HashService } from "src/service/hash.service";

@Injectable({
    providedIn: 'root'
})
export class PlayerService {
    private apiUrl = 'http://localhost:8080/player';


    constructor(
        private http: HttpClient,
        private hashService: HashService
    ) {}

    getPlayers(): Observable<Player[]> {
        const url = `${this.apiUrl}/players`;
        return this.http.get<Player[]>(url);
    }

    getPlayer(playerId?: number): Observable<Player> {
        const url = `${this.apiUrl}/${playerId}`;
        return this.http.get<Player>(url);
    }

    getPlayerName(playerId: number): string {
        let name : string = "";
        this.getPlayer(playerId).subscribe({
            next: (player) => {
                name = player.name
            }
        });

        return name;
    }

    getSalt(email: string): Observable<any> {
        return this.http.get(`${this.apiUrl}/salt`, { params: {"email": email} })
    }

    signIn(username: string, password: string, salt: string): Observable<any> {
        const body = {
            email: username,
            password: this.hashService.hashWithSalt(password, salt)
        };
        return this.http.post(`${this.apiUrl}/login`, body);
    }

    signUp(player: Player): Observable<any> {
        return this.http.post(`${this.apiUrl}/signup`, player);
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