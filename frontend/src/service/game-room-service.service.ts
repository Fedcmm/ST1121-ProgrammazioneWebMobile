import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {GameRoom} from '../model/GameRoom';

@Injectable({
    providedIn: 'root'
})
export class GameRoomService {

    //TODO: mettere l'url giusto
    private apiUrl = 'url_da_cambiare';

    constructor(private http: HttpClient) {
    }

    getGameRooms(): Observable<GameRoom[]> {
        const url = `${this.apiUrl}`;
        return this.http.get<GameRoom[]>(url);
    }

    getGameRoom(gameRoomId: number): Observable<GameRoom> {
        return this.http.get<GameRoom>(`${this.apiUrl}/${gameRoomId}`);
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
