import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {HashService, Password} from "src/service/hash.service";
import {Observable} from 'rxjs';

import {GameRoom} from 'src/model/GameRoom';

@Injectable({
    providedIn: 'root'
})
export class GameRoomService {
    //TODO: mettere l'url giusto
    private apiUrl = 'url_da_cambiare';


    constructor(
        private http: HttpClient,
        private hashService: HashService
    ) {
    }

    getSalt(email: string): Observable<any> {
        return this.http.get(`${this.apiUrl}/salt`, { params: {"email": email} })
    }

    getGameRooms(): Observable<GameRoom[]> {
        const url: string = `${this.apiUrl}`;
        return this.http.get<GameRoom[]>(url);
    }

    getGameRoom(gameRoomId: number | undefined): Observable<GameRoom> {
        const url: string = `${this.apiUrl}/${gameRoomId}`;
        return this.http.get<GameRoom>(url);
    }

    getGameRoomName(gameRoomId: number): string {
        let name: string = "";
        this.getGameRoom(gameRoomId).subscribe({
            next: (gameRoom) => {
                name = gameRoom.name
            }
        });

        return name;
    }

    //TODO: Cosa deve restituire?
    signIn(username: string, password: string, salt: string): Observable<any> {
        const body = {
            username: username,
            password: this.hashService.hashWithSalt(password, salt)
        };
        return this.http.post<any>(this.apiUrl, body);
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
