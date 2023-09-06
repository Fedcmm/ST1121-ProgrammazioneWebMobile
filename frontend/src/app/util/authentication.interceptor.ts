import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor, HTTP_INTERCEPTORS, HttpClient, HttpErrorResponse
} from '@angular/common/http';
import { catchError, Observable, switchMap, throwError } from 'rxjs';
import { AuthInfoService } from "src/service/auth-info.service";

@Injectable()
export class AuthenticationInterceptor implements HttpInterceptor {

    constructor(
        private http: HttpClient,
        private authInfo: AuthInfoService
    ) {}


    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        request = this.addToken(request)

        return next.handle(request).pipe(
            catchError(error => {
                if (error instanceof HttpErrorResponse && error.status === 401 &&
                    !request.url.includes('/login') && !request.url.includes('/refresh') && !request.url.includes('/logout')) {
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
        let urlUserPart = this.authInfo.userType == 'player' ? 'player' : 'game-room';

        return this.http.post<any>(`http://localhost:8080/${urlUserPart}/refresh`, {}, { withCredentials: true }).pipe(
            catchError(error => {
                if (error instanceof HttpErrorResponse && error.status === 401) {
                    this.authInfo.logout();
                    return throwError(() => error);
                }
                return next.handle(request);
            }),
            switchMap(({ token }) => {
                this.authInfo.accessToken = token;
                return next.handle(this.addToken(request));
            })
        );
    }
}

export const AuthenticationInterceptorProvider = [
    { provide: HTTP_INTERCEPTORS, useClass: AuthenticationInterceptor, multi: true }
];
