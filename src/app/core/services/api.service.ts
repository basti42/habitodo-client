import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { catchError, Observable, throwError } from 'rxjs';
import { Team, User } from '../models';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  /*
    Authentication
  */
  registerUser(username: string, email: string, password: string) : Observable<User>{
    return this.http.post<User>(environment.user_registration, {username, email, password});
  }

  loginUser(email: string, password: string) : Observable<User> {
    return this.http.post<User>(environment.user_login, {email, password});
  }

  logoutUser() : Observable<any> {
    return this.http.post(environment.user_logout, {});
  }

  /*
    User
  */
  getUserData() : Observable<any> {
    return this.http.get(environment.user_information);
  }

  updateUserProfile(username: string, position: string, bio: string): Observable<any> {
    console.debug("api service: ", username, bio, position);
    return this.http.post(environment.user_profile_update, {username, bio, position} );
  }

  /*
    Team
  */
  getTeam(team_id: string) : Observable<any> {
    return this.http.get(`${environment.team_get}/${team_id}`);
  }

  addTeam(team: Team) : Observable<any> {
    return this.http.put(environment.team_add, { team_name: team.team_name, team_logo: team.team_logo, members_emails: team.members_emails });
  }

}
