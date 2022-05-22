import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService, User, TeamService, Team} from 'src/app/core';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit {

  currentUser: User = {} as User;
  currentTeam: Team = {} as Team;

  constructor(
    private userService: UserService,
    private teamService: TeamService,
    private router: Router
  ) { }

  ngOnInit(): void { 
    this.userService.currentUser.subscribe({
      next: user => { 
        this.currentUser = user; 
        console.debug("[DEBUG] Current User: ", user); 
      },
      error: err => { console.error("profile component: ", err) }
    });
    this.teamService.currentTeam.subscribe({
      next: team => { 
        this.currentTeam = team; 
        // console.debug("[DEBUG] Current Team: ", team); 
      },
      error: err => { console.error("[Profile Overview Component] error subscribing to current team: ", err); }
    });
  }

}
