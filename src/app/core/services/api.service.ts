import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { catchError, Observable, throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }


  registerUser(user: Object) : Observable<any>{
    return this.http.post(environment.user_registration, JSON.stringify(user));
  }

  loginUser(email: string, password: string) : Observable<any> {
    return this.http.post(environment.user_login, JSON.stringify({email, password}));
  }

  logoutUser() : Observable<any> {
    return this.http.post(environment.user_logout, {});
  }

  getUserData() : Observable<any> {
    return this.http.get(environment.user_information);
  }

}
