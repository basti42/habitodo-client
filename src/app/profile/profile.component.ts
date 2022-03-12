import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Profile, ProfileService } from '../core';
import { User, UserService } from '../core';

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
    private formBuilder: FormBuilder) 
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
    console.log(updated_values);
  }

}
