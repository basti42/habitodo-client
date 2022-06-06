import { Component, OnInit } from '@angular/core';
import { Team, TeamService } from 'src/app/core';

@Component({
  selector: 'app-team-overview',
  templateUrl: './team-overview.component.html',
  styleUrls: ['./team-overview.component.css']
})
export class TeamOverviewComponent implements OnInit {

  currentTeam: Team = {} as Team;

  constructor(
    private teamService: TeamService
  ) { }

  ngOnInit(): void {
    this.teamService.currentTeam.subscribe({
      next: team => { console.debug("[Team Overview Component] current Team: ", team); this.currentTeam = team; },
      error: err => { console.error("[Team Overview Component] error retrieving team: ", err); }
    });
  }

}
