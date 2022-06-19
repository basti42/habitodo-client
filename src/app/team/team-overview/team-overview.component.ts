import { Component, OnInit } from '@angular/core';
import { Team, TeamService, UserPublic, Metrics, MetricService } from 'src/app/core';

@Component({
  selector: 'app-team-overview',
  templateUrl: './team-overview.component.html',
  styleUrls: ['./team-overview.component.css']
})
export class TeamOverviewComponent implements OnInit {

  currentTeam: Team = {} as Team;
  currentMembers: Array<UserPublic> = [];
  currentTeamMetrics: Array<Metrics> = []

  constructor(
    private teamService: TeamService,
    private metricService: MetricService
  ) { }

  ngOnInit(): void {
    this.teamService.currentTeam.subscribe({
      next: team => { console.debug("[Team Overview Component] current Team: ", team); this.currentTeam = team; },
      error: err => { console.error("[Team Overview Component] error retrieving team: ", err); }
    });

    // query public member profiles and subscribe to them
    console.debug("[Team Overview Component] current team member ids: ", this.currentTeam.members);
    this.teamService.getMemberProfiles(this.currentTeam.members);
    this.teamService.members.subscribe({
      next: members => { console.debug("[Team Overview Component] current members: ", members); this.currentMembers = members; },
      error: err => { console.error("[Team Overview Component] error subscribing to public members: ", err); }
    });

    // subscribe to team metrics
    this.metricService.currentTeamMetrics.subscribe({
      next: metrics => { console.debug("[Team Overview Component] current team metrics: ", metrics); this.currentTeamMetrics = metrics; },
      error: err => { console.error("[Team Overview Component] error retrieving team metrics: ", err); this.currentTeamMetrics = []; }
    });
  }

}
