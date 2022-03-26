import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, ReplaySubject, of , map} from 'rxjs';
import { distinctUntilChanged } from 'rxjs';

import { Profile } from '../models/profiles';
import { ApiService } from './api.service';
import { JwtService } from './jwt.service';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private currentProfileSubject = new BehaviorSubject<Profile>({} as Profile);
  public currentProfile = this.currentProfileSubject.asObservable().pipe(distinctUntilChanged());

  constructor(private apiService: ApiService, private jwtService: JwtService) { }

retrieveProfile(){
  const token = this.jwtService.getToken();
  if (token){
    this.apiService.getUserProfile().subscribe({
      next: profile => { this.currentProfileSubject.next(profile) },
      error: err => { 
        console.error(`Error with user profile: ${err}`);
        this.currentProfileSubject.next({} as Profile);
      }
    });
  } else {
    console.log("Unable to retrieve profile: login/register first.");
    this.currentProfileSubject.next({} as Profile);
  } 
}

updateProfile(username: string, bio: string, position: string){
  const token = this.jwtService.getToken();
  if (token) {
    this.apiService.updateUserProfile(username, position, bio).subscribe({
      next: result => { console.log(`Update profile message: ${result.message}`); },
      error: err => { console.error(`Update profile message: ${err}`); }
    });
  } else {
    console.log("Unable to update profile. Token probably exipred. Please login again!");
  }
}

forgetProfile(){
  this.currentProfileSubject.next({} as Profile);
}

}
