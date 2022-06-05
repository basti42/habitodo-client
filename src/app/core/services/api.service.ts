import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { catchError, Observable, throwError } from 'rxjs';
import { Team, Template, User } from '../models';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  /*
    Authentication
  */
  registerUser(username: string, email: string, password: string) : Observable<User>{
    return this.http.put<User>(environment.user_registration, {username, email, password});
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

  uploadAvatarImage(img_header: string, img_data: string) : Observable<any> {
    console.debug("Routes: ", img_header, img_data);
    return this.http.put(environment.user_avatar_upload, {img_header, img_data});
  }

  /*
    Team
  */
  getTeam(team_id: string) : Observable<any> {
    return this.http.get(`${environment.team_get}/${team_id}`);
  }

  getTeams() : Observable<any> {
    return this.http.get(environment.team_get);
  }

  addTeam(team: Team) : Observable<any> {
    return this.http.put(environment.team_add, { team_name: team.team_name, team_logo: team.team_logo, members_emails: team.emails, settings: { 
      feedback_interval: team.feedback_interval, effective_day: team.effective_day, reminder: team.reminder, feedback_time_range: team.feedback_time_range } });
  }


  /*
    Metrics
  */
 getMetrics() : Observable<any> {
   return this.http.get(environment.metrics_get);
 }

 getTeamMetrics(team_id: String) : Observable<any> {
   return this.http.get(`${environment.team_metrics_get}/${team_id}`)
 }


 /*
  Templates
 */
getTemplates(team_id: String) : Observable<any> {
  const url = environment.templates + team_id;
  // console.debug("TEMPLATE URL = ", url);
  return this.http.get(url);
}

addTemplate(template: Template) : Observable<any> {
  return this.http.put(environment.templates, template);
}

}
