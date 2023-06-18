import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Event } from 'src/model/Event';

@Injectable({
    providedIn: 'root'
})
export class EventService {

    private apiUrl = 'http://localhost:8080/event';


    constructor(
        private http: HttpClient
    ) {}


    getEvents(): Observable<Event[]> {
        const url = `${this.apiUrl}/`;
        return this.http.get<Event[]>(url);
    }

    getEvent(eventId: number): Observable<Event> {
        const url = `${this.apiUrl}/${eventId}`;
        return this.http.get<Event>(url);
    }

    createEvent(event: Event): Observable<Event> {
        const url = `${this.apiUrl}/`;
        return this.http.post<Event>(url, event);
    }

    /*
        updateEvent(event: Event): Observable<Event> {
            const url = `${this.apiUrl}/${event.id}`;
            return this.http.patch<Event>(url, event);
        }
    */

    deleteEvent(eventId: number): Observable<Event> {
        const url = `${this.apiUrl}/${eventId}`;
        return this.http.delete<Event>(url);
    }

    deleteEvents(eventIds: number[]): Observable<Event> {
        const url = `${this.apiUrl}/`;
        return this.http.delete<Event>(url, { params: { ids: eventIds } });
    }
}
