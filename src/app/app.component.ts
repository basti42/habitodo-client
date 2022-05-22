import { Component, OnInit } from '@angular/core';
import { TeamService, User, UserService } from './core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'habitodo-client';

  constructor(
    private userService: UserService,
    private teamService: TeamService
  ) {}

  ngOnInit(){
    this.userService.populate();
    this.teamService.setInitialTeam();
  }

}
