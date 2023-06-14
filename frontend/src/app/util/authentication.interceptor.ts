import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor, HTTP_INTERCEPTORS
} from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Player } from "src/model/Player";
import { GameRoom } from "src/model/GameRoom";

@Injectable()
export class AuthenticationInterceptor implements HttpInterceptor {

    static token?: string;
    static user?: Player | GameRoom;


    constructor() {}


    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (AuthenticationInterceptor.token) {
            request = request.clone({
                withCredentials: true,
                headers: request.headers.set('Authorization', `Bearer ${AuthenticationInterceptor.token}`)
            });
        }

        return next.handle(request);
    }
}

export const AuthenticationInterceptorProvider = [
    { provide: HTTP_INTERCEPTORS, useClass: AuthenticationInterceptor, multi: true }
];
