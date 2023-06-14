import {Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HashService } from "src/service/hash.service";
import { Observable } from 'rxjs';

import { GameRoom } from 'src/model/GameRoom';
import { Game } from "src/model/Game";

@Injectable({
    providedIn: 'root'
})
export class GameRoomService {
    //TODO: mettere l'url giusto
    private apiUrl = 'url_da_cambiare';


    constructor(
        private http: HttpClient,
        private hashService: HashService
    ) { }


    getGameRooms(): Observable<GameRoom[]> {
        const url : string = `${this.apiUrl}`;
        return this.http.get<GameRoom[]>(url);
    }

    getGameRoom(gameRoomId: number | undefined): Observable<GameRoom> {
        const url: string = `${this.apiUrl}/${gameRoomId}`;
        return this.http.get<GameRoom>(url);
    }

    getGameRoomName(gameRoomId: number): string {
        let name : string = "";
        this.getGameRoom(gameRoomId).subscribe({
            next: (gameRoom) => {
                name = gameRoom.name
            }
        });

        return name;
    }

    getGames(gameRoomId: number): Observable<Game[]> {
        return this.http.get<Game[]>(`${this.apiUrl}/${gameRoomId}/games`);
    }

    //TODO: Cosa deve restituire?
    signIn(username: string, password: string): Observable<any> {
        const body = {
            username: username,
            password: this.hashService.hash(password)
        };
        return this.http.post<any>(this.apiUrl, body);
    }

    createGameRoom(gameRoom: GameRoom): Observable<GameRoom> {
        return this.http.post<GameRoom>(`${this.apiUrl}`, gameRoom);
    }

    updateGameRoom(gameRoom: GameRoom): Observable<GameRoom> {
        return this.http.put<GameRoom>(`${this.apiUrl}/${gameRoom.id}`, gameRoom);
    }

    deleteGameRoom(gameRoomId: number): Observable<GameRoom> {
        return this.http.delete<GameRoom>(`${this.apiUrl}/${gameRoomId}`);
    }
}
