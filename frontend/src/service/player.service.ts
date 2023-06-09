import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Player } from 'src/model/Player';
import { HashService } from "src/app/hash.service";

@Injectable({
    providedIn: 'root'
})
export class PlayerService {
    // TODO: mettere l'url giusto
    private apiUrl = 'url_da_cambiare';


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

    navigateToPlayerProfile(playerId: number): void {
        //Reindirizza al componente o alla path
    }


    createPlayer(player: Player): Observable<Player> {
        return this.http.post<Player>(this.apiUrl, player);
    }

    //TODO: Cosa deve restituire?
    signIn(username: string, password: string): Observable<any> {
        const body = {
            username: username,
            password: this.hashService.hash(password)
        };
        return this.http.post<any>(this.apiUrl, body);
    }

    signUp(name: string, surname: string, email: string, password: string): Observable<Player> {
        return this.createPlayer(new Player(-1, name, surname, email, this.hashService.hash(password)));
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