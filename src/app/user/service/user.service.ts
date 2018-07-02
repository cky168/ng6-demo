import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { AppConfig } from '../../share';
import { User, Response } from '../../models';

import { Observable, throwError } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { map,catchError } from 'rxjs/operators';
import { of } from 'rxjs';
//import { pipe } from '@angular/core/src/render3/pipe';
//import { error } from '@angular/compiler/src/util';
import { UtilsService } from '../../services';

/*@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }
}
*/

@Injectable()
export class UserService {
    loginStatus$ = new BehaviorSubject<boolean>(false);
    currentUser$ = new BehaviorSubject<User>(null);
    constructor(
        private http: HttpClient,
        private appConfig: AppConfig,
        private utils: UtilsService
    ) { }

    loginServer(loginData): Observable<Response> {
        let username = loginData.username.trim();
        let password = loginData.password.trim();
        return this.http.post<Response>(this.appConfig.apiUrl + '/users/authenticate', 
        { username: username, password: password });
    }
    login(loginData): Observable<boolean> {
        return this.loginServer(loginData)
        .pipe(
          map((res:Response)=> {
            if (res.success) {
              this.loginStatus$.next(true);
              this.currentUser$.next(loginData.username);
              if (loginData.rememberMe) {
                this.utils.writeToken(res.payload);
            }
              return true;
            } else {
              //console.log('can not login');
              return false;
            }
          }),catchError(error=>{
              console.log('error');
              return of(false);
          })
        )
    }
    logout() {
        this.loginStatus$.next(false);
        this.currentUser$.next(null);
        this.utils.removeToken();
    }
    getLoginStatus(): Observable<boolean> {
        return this.loginStatus$;
    }
     getCurrentUser(): Observable<User> {
        return this.currentUser$;
    }
    checkUser(): Observable<boolean> {
        if (!this.utils.isTokenExpired()) {
            this.loginStatus$.next(true);
            this.getUser();
            return of(true);
        } else {
            console.log('no token or token is expired');
            this.utils.removeToken();
            return of(false);
        }
    }
     // get user from server
     getUserFromServer(): Observable<User> {
        if (!this.utils.isTokenExpired()) {
            const token = this.utils.getToken();
            return this.http.post(this.appConfig.apiUrl + '/users/currentUser', { 'token': token })
               // .map((res: Response) => {
               //     if (res.success) {
               //         return res.payload;
               //     } else {
               //         return null;
               //     }
                //})
                .pipe(
                    map((res:Response)=> {
                      if (res.success) {
                        return res.payload;
                      } else {
                        return null;
                      }
                    }),catchError(error=>{
                        console.log('error');
                        return of(false);
                    })
                  )
        } else {
            return of(null);
        }
    }
    getUser() {
        this.getUserFromServer()
            .subscribe(res => {
                this.currentUser$.next(res);
            },
            (err: HttpErrorResponse) => {
                if (err.error instanceof Error) {
                    console.log('client-side error');
                } else {
                    console.log('server-side error');
                }
            })
    }
}