import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Record } from 'src/model/Record';

@Injectable({
    providedIn: 'root'
})
export class RecordService {
    //TODO: mettere l'url giusto
    //TODO: fixare gli url per le chiamate
    private apiUrl = 'url_da_cambiare';


    constructor(private http: HttpClient) {
    }


    getGameRoomRecords(gameRoomId: number|undefined): Observable<Record[]> {
        const url = `${this.apiUrl}/gameRoom/?gameRoomId=${gameRoomId}`;
        return this.http.get<Record[]>(url);
    }

    getRecord(recordId: number): Observable<Record> {
        const url = `${this.apiUrl}/${recordId}`;
        return this.http.get<Record>(url);
    }

    getPlayerRecords(playerId?: number): Observable<Record[]> {
        const url = `${this.apiUrl}/player/?playerId=${playerId}`;
        return this.http.get<Record[]>(url);
    }

    getVerifiedRecords(playerId: number): Observable<Record[]> {
        const url = `${this.apiUrl}/player/verifiedRecord/?playerId=${playerId}`;
        return this.http.get<Record[]>(url);
    }

    createRecord(record: Record): Observable<Record> {
        const url = `${this.apiUrl}`;
        return this.http.post<Record>(url, record);
    }

    updateRecord(record: Record): Observable<Record> {
        const url = `${this.apiUrl}/${record.player, record.gameRoom, record.game}`;
        return this.http.put<Record>(url, record);
    }

    deleteRecord(recordId: number): Observable<Record> {
        const url = `${this.apiUrl}/${recordId}`;
        return this.http.delete<Record>(url);
    }
}
