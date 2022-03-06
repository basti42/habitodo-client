import { Component, OnInit } from '@angular/core';
import { User, UserService } from 'src/app/core';

@Component({
  selector: 'app-layout-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  currentUser: User;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.currentUser.subscribe({
      next: user => { this.currentUser = user },
      error: err => { console.error(err); }
    });
  }

}
