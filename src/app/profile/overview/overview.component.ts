import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService, User, TeamService, Team, Cardbody, MetricService, Metrics, Template, TemplateService} from 'src/app/core';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit {

  currentUser: User = {} as User;
  currentTeam: Team = {} as Team;
  currentUserMetrics: Array<Metrics> = [];
  currentMetricTemplates: Array<Template> = [];

  constructor(
    private userService: UserService,
    private teamService: TeamService,
    private metricService: MetricService,
    private templateService: TemplateService,
    private router: Router
  ) { }

  ngOnInit(): void { 
    this.userService.currentUser.subscribe({
      next: user => { 
        this.currentUser = user; 
        // console.debug("[DEBUG] Current User: ", user); 
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

    this.templateService.load(this.currentTeam.team_id);
    this.templateService.currentTemplate.subscribe({
      next: templates => { this.currentMetricTemplates = templates; },
      error: err => { console.error("[Profile Overview Component] error retrieving templates: ", err); }
    });

    this.metricService.getUserMetrics();
    this.metricService.currentUserMetrics.subscribe({
      next: userMetrics => { console.debug("[Profile Overview Component] setting user metrics: ", userMetrics); this.currentUserMetrics = userMetrics; },
      error: err => { console.error("[Profile Overview Component] Error retrieving user metrics: ", err); }
    });
  }


  getUsercardBody(): Array<Cardbody> {
    return [{'key': 'registered since', 'value': this.currentUser.registered_at.toLocaleString()}]
  }

  calcMetricMean() : string {
    let mean: number = 0.0;
    this.currentUserMetrics.forEach( metric => { mean = mean + metric.mean } );
    mean = mean / this.currentUserMetrics.length;
    return mean.toFixed(2);
  }

  getMaxPossValue() : string {
    let maxPossValue: number = (this.currentMetricTemplates.length >= 0) ? 7.00 : 7.00;
    return maxPossValue.toFixed(2);
  }



}
