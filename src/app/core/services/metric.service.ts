import { Injectable } from '@angular/core';
import { BehaviorSubject, distinctUntilChanged } from 'rxjs';
import { Metrics, Team } from '../models';
import { ApiService } from './api.service';
import { JwtService } from './jwt.service';
import { TeamService } from './team.service';

@Injectable({
  providedIn: 'root'
})
export class MetricService {

  private currentUserMetricSubject = new BehaviorSubject<Array<Metrics>>([]);
  public currentUserMetrics = this.currentUserMetricSubject.asObservable().pipe(distinctUntilChanged());

  private currentTeamMetricSubject = new BehaviorSubject<Array<Metrics>>([]);
  public currentTeamMetrics = this.currentTeamMetricSubject.asObservable().pipe(distinctUntilChanged());

  private currentTeam: Team = {} as Team;

  constructor(
    private apiService : ApiService,
    private jwtService : JwtService,
    private teamService: TeamService
  ) { }

  
  load(){
    const token = this.jwtService.getToken();
    if (token) {
      this.getUserMetrics();
    }

    this.teamService.currentTeam.subscribe({
      next: team => this.currentTeam = team,
      error: err =>  { this.currentTeam = {} as Team; console.error("[METRICSERIVE] ", err); }
    });
    if (Object.keys(this.currentTeam).length <= 0){
      this.apiService.getTeamMetrics(this.currentTeam.team_id).subscribe({
        next: team_metrics => { this.currentTeamMetricSubject.next(team_metrics); console.debug("[MetricService] current team metrics: ", team_metrics) },
        error: err => { this.currentTeamMetricSubject.next([]); console.debug("[MetricsService] empty team metrics. Error: ", err);  }
      });   
    }

  } 


  getUserMetrics() {
    this.apiService.getUserMetrics().subscribe({
      next: userMetrics => { this.currentUserMetricSubject.next(userMetrics); },
      error: err => {
        this.currentUserMetricSubject.next([]);
        console.error("[METRICS SERVICE] Error retrieving user metrics: ", err);
      }
    });
  }

}
