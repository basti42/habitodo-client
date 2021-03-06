import { Component, OnInit } from '@angular/core';
import { User, UserService } from 'src/app/core';

import { Router } from '@angular/router';

@Component({
  selector: 'app-layout-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  currentUser: User;

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.userService.currentUser.subscribe({
      next: user => { this.currentUser = user },
      error: err => { console.error(err); }
    });
  }

  logout() {
    this.userService.logout().subscribe({
      next: nothing => { 
        this.router.navigate(["/"]);
       },
      error: err => { console.error(err); }
    });
  }

}
