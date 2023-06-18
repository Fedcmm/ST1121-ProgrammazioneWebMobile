import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Record } from 'src/model/Record';

@Injectable({
    providedIn: 'root'
})
export class RecordService {

    private apiUrl = 'http://localhost:8080/record';


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

    deleteRecords(recordIds: number[]): Observable<Record>{
        const url = `${this.apiUrl}/`;
        return this.http.delete<Record>(url, { params: { ids: recordIds }});
    }
}
