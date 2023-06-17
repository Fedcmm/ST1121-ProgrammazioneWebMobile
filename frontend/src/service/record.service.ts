import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Record } from 'src/model/Record';
import { Event } from "src/model/Event";

@Injectable({
    providedIn: 'root'
})
export class RecordService {

    private apiUrl = 'url_to_be_replaced';


    constructor(
        private http: HttpClient
    ) {}


    getRecord(recordId: number): Observable<Record> {
        const url = `${this.apiUrl}/${recordId}`;
        return this.http.get<Record>(url);
    }

    createRecord(record: Record): Observable<Record> {
        const url = `${this.apiUrl}/`;
        return this.http.post<Record>(url, record);
    }

    updateRecord(record: Record): Observable<Record> {
        const url = `${this.apiUrl}/${record.id}`;
        return this.http.put<Record>(url, record);
    }

    deleteRecords(recordsId: number []): Observable<Event>{
        const url = `${this.apiUrl}/${recordsId}`;
        return this.http.delete<Event>(url);
    }
}
