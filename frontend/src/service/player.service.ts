import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Player } from 'src/model/Player';
import { Record } from 'src/model/Record';
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


    getSalt(email: string): Observable<any> {
        return this.http.get(`${this.apiUrl}/salt`, { params: {"email": email} })
    }

    getPlayers(): Observable<Player[]> {
        const url = `${this.apiUrl}/all`;
        return this.http.get<Player[]>(url);
    }

    getPlayer(playerId?: number): Observable<Player> {
        const url = `${this.apiUrl}/${playerId}`;
        return this.http.get<Player>(url);
    }

    getRecords(playerId?: number): Observable<Record> {
        const url = `${this.apiUrl}/${playerId}/records`;
        return this.http.get<Player>(url);
    }

    getVerifiedRecords(playerId?: number): Observable<Record> {
        const url = `${this.apiUrl}/${playerId}/verifiedRecords`;
        return this.http.get<Player>(url);
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
