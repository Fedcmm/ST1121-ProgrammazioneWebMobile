import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor, HTTP_INTERCEPTORS, HttpClient, HttpErrorResponse
} from '@angular/common/http';
import { BehaviorSubject, catchError, filter, Observable, switchMap, take, throwError } from 'rxjs';
import { Player } from "src/model/Player";
import { AuthInfoService } from "src/service/auth-info.service";

@Injectable()
export class AuthenticationInterceptor implements HttpInterceptor {

    private isRefreshing = false;
    private refreshTokenSubject = new BehaviorSubject<any>(null);


    constructor(
        private http: HttpClient,
        private authInfo: AuthInfoService
    ) {}


    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (this.authInfo.accessToken) {
            request = this.addToken(request)
        }

        return next.handle(request).pipe(
            catchError(error => {
                if (error instanceof HttpErrorResponse && error.status === 401 && !request.url.includes('/login')) {
                    return this.refreshToken(request, next);
                } else {
                    return throwError(() => error);
                }
            })
        );
    }

    private addToken(request: HttpRequest<any>) {
        return request.clone({
            withCredentials: true,
            headers: request.headers.set('Authorization', `Bearer ${this.authInfo.accessToken}`)
        });
    }

    private refreshToken(request: HttpRequest<any>, next: HttpHandler) {
        if (!this.isRefreshing) {
            this.isRefreshing = true;
            this.refreshTokenSubject.next(null);

            let urlUserPart = this.authInfo.user instanceof Player ? 'player' : 'game-room';
            return this.http.post<any>(`http://localhost:8080/${urlUserPart}/refresh`, {}, { withCredentials: true }).pipe(
                switchMap((newToken) => {
                    this.isRefreshing = false;

                    this.authInfo.accessToken = newToken;
                    this.refreshTokenSubject.next(this.authInfo.accessToken);

                    return next.handle(this.addToken(request));
                }
            ));
        }

        return this.refreshTokenSubject.pipe(
            filter(token => token != null),
            take(1),
            switchMap((token) => {
                this.authInfo.accessToken = token;
                return next.handle(this.addToken(request))
            })
        );
    }
}

export const AuthenticationInterceptorProvider = [
    { provide: HTTP_INTERCEPTORS, useClass: AuthenticationInterceptor, multi: true }
];
