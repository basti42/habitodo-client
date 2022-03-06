import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, ReplaySubject } from 'rxjs';
import { distinctUntilChanged } from 'rxjs';


import { User } from '../models';
import { ApiService } from './api.service';
import { JwtService } from './jwt.service';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  private currentUserSubject = new BehaviorSubject<User>({} as User);
  public currentUser = this.currentUserSubject.asObservable().pipe(distinctUntilChanged());

  private isAuthenticatedSubject = new ReplaySubject<boolean>(1);
  public isAuthenticated = this.isAuthenticatedSubject.asObservable();

  constructor(private apiService: ApiService, private jwtService: JwtService) { }

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
  }

  purgeAuth() {
    // Remove JWT from localstorage
    this.jwtService.destroyToken();
    // Set current user to an empty object
    this.currentUserSubject.next({} as User);
    // Set auth status to false
    this.isAuthenticatedSubject.next(false);
  }

  getCurrentUser(): User {
    return this.currentUserSubject.value;
  }

}
