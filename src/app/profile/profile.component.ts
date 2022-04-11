import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { User, UserService } from '../core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  currentUser: User = {} as User;
  profileForm: FormGroup;

  constructor(
    private userService: UserService, 
    private formBuilder: FormBuilder,
    private router: Router) 
    {
      this.profileForm = this.formBuilder.group({
        'username': [''],
        'position': [''],
        'bio': ['']
      });
    }

  ngOnInit(): void {
    this.userService.currentUser.subscribe({
      next: user => { this.currentUser = user },
      error: err => { console.error("profile component: ", err) }
    });
  }

  submitForm(){
    const updated_values = this.profileForm.value;
    // console.debug("Updated Values: ", updated_values);

    const username = (updated_values.username) ? updated_values.username : this.currentUser.username;
    const position = (updated_values.position) ? updated_values.position : this.currentUser.position;
    const bio = (updated_values.bio) ? updated_values.bio : this.currentUser.bio;

    // if nothing changed, do not update
    if (username === this.currentUser.username && position === this.currentUser.position && bio === this.currentUser.bio) {
      // console.debug("Nothing changed. Skipping");
      return;
    }

    this.userService.updateProfile(username, bio, position).subscribe({
      next: status => {}, //console.debug("profile component: ", status),
      error: err => console.error("profile component: ", err)
    }
    );
    this.router.navigate(['/profile', `${username}`])
  }

}
