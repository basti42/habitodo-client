import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Profile, ProfileService } from '../core';
import { User, UserService } from '../core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  currentProfile: Profile = {} as Profile;
  currentUser: User = {} as User;
  profileForm: FormGroup;

  constructor(
    private profileService: ProfileService, 
    private userService: UserService, 
    private formBuilder: FormBuilder,
    private router: Router) 
    {
      this.profileForm = this.formBuilder.group({
        'username': [''],
        'position': [''],
        'bio': ['']
      })
    }

  ngOnInit(): void {
    this.profileService.currentProfile.subscribe({
      next: profile => { this.currentProfile = profile },
      error: err => { console.error("profile-component: ", err) }
    });
  
    this.userService.currentUser.subscribe({
      next: user => { this.currentUser = user },
      error: err => { console.error("profile component: ", err) }
    });
  }

  submitForm(){
    const updated_values = this.profileForm.value;

    const username = (updated_values.username) ? updated_values.username : this.currentUser.username;
    const position = (updated_values.position) ? updated_values.position : this.currentProfile.position;
    const bio = (updated_values.bio) ? updated_values.bio : this.currentProfile.bio;

    // if nothing changed, do not update
    if (username === this.currentUser.username && position === this.currentProfile.position && bio === this.currentProfile.bio) {
      console.debug("Nothing changed. Skipping");
      return;
    }

    this.profileService.updateProfile(username, bio, position);
    this.router.navigate(['/profile', `${username}`])
  }

}
