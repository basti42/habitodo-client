import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { catchError, Observable, throwError } from 'rxjs';
import { User } from '../models';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }


  registerUser(username: string, email: string, password: string) : Observable<User>{
    return this.http.post<User>(environment.user_registration, {username, email, password});
  }

  loginUser(email: string, password: string) : Observable<User> {
    return this.http.post<User>(environment.user_login, {email, password});
  }

  logoutUser() : Observable<any> {
    return this.http.post(environment.user_logout, {});
  }

  getUserData() : Observable<any> {
    return this.http.get(environment.user_information);
  }

  getUserProfile(): Observable<any> {
    return this.http.get(environment.user_profile);
  }

}
