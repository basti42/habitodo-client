import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, ReplaySubject, of , map} from 'rxjs';
import { distinctUntilChanged } from 'rxjs';

import { Team } from '../models';
import { ApiService } from './api.service';
import { JwtService } from './jwt.service';

@Injectable({
  providedIn: 'root'
})
export class TeamService {

  private currentTeamSubject = new BehaviorSubject<Team>({} as Team);
  public currentTeam = this.currentTeamSubject.asObservable().pipe(distinctUntilChanged());

  constructor(private apiService: ApiService, private jwtService: JwtService) { }

  // this will be run once on startup
  setInitialTeam(){
    const token = this.jwtService.getToken();
    if (token){
      this.getTeams();
    } else {
      // set next team to empty object to avoid weird memory states
      this.purgeTeam();
    }
  }

  purgeTeam(){
    this.currentTeamSubject.next({} as Team);
  }


  getTeam(team_id: string){
    this.apiService.getTeam(team_id).subscribe({
      next: team => { this.currentTeamSubject.next(team); },
      error: error => { this.currentTeamSubject.next({} as Team) }
    });
  }

  getTeams(){
    this.apiService.getTeams().subscribe({
      next: teams => { 
        if (teams.length <= 0){
          this.currentTeamSubject.next({} as Team);
        } else {
          this.currentTeamSubject.next(teams[0]);
        }
      }, 
      error: error => { this.currentTeamSubject.next({} as Team); console.error("[TeamService::getTeams] ", error); }
    });
  }

  addTeam(team: Team){
    this.apiService.addTeam(team).subscribe({
      next: addedTeam => { 
        console.debug(`[Team Service] Added Team: ${addedTeam.team_name}`);
        this.currentTeamSubject.next(addedTeam); 
      },
      error: error => {
        console.error(`[Team Service] Added Team: ${error}`);
        this.currentTeamSubject.next({} as Team);
      } 
    })
  }

}
