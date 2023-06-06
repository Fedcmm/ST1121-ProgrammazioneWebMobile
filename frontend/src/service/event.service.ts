import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Event } from 'src/model/Event';

@Injectable({
    providedIn: 'root'
})
export class EventService {
    //TODO: mettere l'url giusto
    private apiUrl = 'url_da_cambiare';


    constructor(private http: HttpClient) {
    }

    getEvents(eventId: number): Observable<Event[]> {
        const url = `${this.apiUrl}?eventId=${eventId}`;
        return this.http.get<Event[]>(url);
    }

    getEvent(eventId: number): Observable<Event> {
        const url = `${this.apiUrl}/${eventId}`;
        return this.http.get<Event>(url);
    }

    getEventName(eventId: number): Observable<string> {
        return this.getEvent(eventId).pipe(
            map(Event => Event.name)
        );
    }

    createEvent(event: Event): Observable<Event> {
        const url = `${this.apiUrl}`;
        return this.http.post<Event>(url, event);
    }

    /*
        updateEvent(event: Event): Observable<Event> {
            const url = `${this.apiUrl}/${event.id}`;
            return this.http.put<Event>(url, event);
        }
    */
    deleteEvent(eventId: number): Observable<Event> {
        const url = `${this.apiUrl}/${eventId}`;
        return this.http.delete<Event>(url);
    }

    // deleteEvents(event: Event[]) Observable<Event[]> {}

}