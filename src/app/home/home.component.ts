import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { User, UserService } from '../core';

@Component({
  selector: 'app-home-page',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
    private router: Router,
    private userService: UserService
  ) { }

  isAuthenticated: boolean = false;
  

  ngOnInit(): void {
    this.userService.isAuthenticated.subscribe({
      next: authenticated => {
        this.isAuthenticated = authenticated;
      },
      error: err => { console.error(err); }
    });
  }

}
