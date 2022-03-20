import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService, Profile, User, ProfileService } from 'src/app/core';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit {

  currentProfile: Profile = {} as Profile;
  currentUser: User = {} as User;

  constructor(
    private userService: UserService,
    private profileService: ProfileService,
    private router: Router
  ) { }

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

}
