import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HashService, Password } from "src/service/hash.service";
import { Observable } from 'rxjs';

import { GameRoom } from 'src/model/GameRoom';
import { Game } from "src/model/Game";

@Injectable({
    providedIn: 'root'
})
export class GameRoomService {

    private apiUrl = 'http://localhost:8080/gameroom';


    constructor(
        private http: HttpClient,
        private hashService: HashService
    ) {}


    getSalt(email: string): Observable<any> {
        return this.http.get(`${this.apiUrl}/salt`, { params: {"email": email} })
    }

    getGameRooms(): Observable<GameRoom[]> {
        const url = `${this.apiUrl}`;
        return this.http.get<GameRoom[]>(url);
    }

    getGameRoom(gameRoomId?: number): Observable<GameRoom> {
        const url = `${this.apiUrl}/${gameRoomId}`;
        return this.http.get<GameRoom>(url);
    }

    getGames(gameRoomId: number): Observable<Game[]> {
        return this.http.get<Game[]>(`${this.apiUrl}/${gameRoomId}/games`);
    }

    signUp(name: string, email: string, password: Password): Observable<any> {
        return this.http.post(`${this.apiUrl}/signup`, new GameRoom(-1, name, email, password, []));
    }

    singIn(username: string, password: string, salt: string): Observable<any> {
        const body = {
            email: username,
            password: this.hashService.hashWithSalt(password, salt)
        };
        return this.http.post(`${this.apiUrl}/login`, body);
    }

    updateGameRoom(gameRoom: GameRoom): Observable<GameRoom> {
        return this.http.put<GameRoom>(`${this.apiUrl}/${gameRoom.id}`, gameRoom);
    }

    deleteGameRoom(gameRoomId: number): Observable<GameRoom> {
        return this.http.delete<GameRoom>(`${this.apiUrl}/${gameRoomId}`);
    }
}
