import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, ReplaySubject, of , map} from 'rxjs';
import { distinctUntilChanged } from 'rxjs';


import { User } from '../models';
import { ApiService } from './api.service';
import { JwtService } from './jwt.service';
import { TeamService } from './team.service';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  private currentUserSubject = new BehaviorSubject<User>({} as User);
  public currentUser = this.currentUserSubject.asObservable().pipe(distinctUntilChanged());

  private isAuthenticatedSubject = new ReplaySubject<boolean>(1);
  public isAuthenticated = this.isAuthenticatedSubject.asObservable();

  constructor(
    private apiService: ApiService, 
    private jwtService: JwtService, 
    private teamService: TeamService) { }

  // this will be run once on app startup
  populate(){
    // if a token exists attempt to get all user information
    const token = this.jwtService.getToken();
    if (token){
      this.apiService.getUserData().subscribe({
        next: user => { this.setAuth(user, token); },
        error: err => { this.purgeAuth(); }
      });
    } else {
      // remove all possible existing tokens and user info
      this.purgeAuth();
    }
  }

  setAuth(user: User, token: string) {
    // Save JWT sent from server in localstorage
    this.jwtService.saveToken(token);
    // Set current user data into observable
    this.currentUserSubject.next(user);
    // Set isAuthenticated to true
    this.isAuthenticatedSubject.next(true);
    // retrieve Team information for the user if exists already
    if (user.team_ids && user.team_ids.length > 0){
      this.teamService.getTeam(user.team_ids[0]);
    }
  }

  purgeAuth() {
    // Remove JWT from localstorage
    this.jwtService.destroyToken();
    // Set current user to an empty object
    this.currentUserSubject.next({} as User);
    // Set auth status to false
    this.isAuthenticatedSubject.next(false);
  }

  login(email: string, password: string): Observable<User>{
    return this.apiService.loginUser(email, password).pipe(map(
      user => {
        this.setAuth(user, user.token);
        return user;
      }
    ));
  }

  register(username: string, email: string, password: string): Observable<User>{
    return this.apiService.registerUser(username, email, password).pipe(map(
      user => {
        this.setAuth(user, user.token);
        return user;
      } 
    ));
  }

  logout(){
    return this.apiService.logoutUser().pipe(map(
      status => {
        this.purgeAuth();
        return status.message;
      }
    ));
  }

  updateProfile(username: string, bio: string, position: string){
    // console.debug("user service: ", username, bio, position);
    return this.apiService.updateUserProfile(username, position, bio).pipe(map(
      status => {
        this.apiService.getUserData().pipe(map(user => {
          // console.debug("user service update: ", user);
          this.currentUserSubject.next(user);
        }));
        return status.message;
      } 
    ))
  }

  // attemptAuth(type: string, credentials: Credentials): Observable<User> {
  //   const route = (type === 'login') ? '/login' : '';
  //   return this.apiService.auth('/users' + route, {user: credentials})
  //     .pipe(map(
  //     data => {  
  //       this.setAuth(data.user);
  //       return data;
  //     }
  //   ));
  // }


  getCurrentUser(): User {
    return this.currentUserSubject.value;
  }

}
