import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService, User} from 'src/app/core';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit {

  currentUser: User = {} as User;

  constructor(
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit(): void { 
    this.userService.currentUser.subscribe({
      next: user => { this.currentUser = user },
      error: err => { console.error("profile component: ", err) }
    });
  }

}
