import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Event} from '../model/Event';

@Injectable({
    providedIn: 'root'
})
export class EventService{
    //TODO: mettere l'url giusto
    private apiUrl = 'url_da_cambiare';

    constructor(private http: HttpClient) {
    }

    getEvents(gameRoomId: number): Observable<Event[]> {
        const url = `${this.apiUrl}?gameRoomId=${gameRoomId}`;
        return this.http.get<Event[]>(url);
    }

    getEvent(eventId: number): Observable<Event> {
        const url = `${this.apiUrl}/${eventId}`;
        return this.http.get<Event>(url);
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