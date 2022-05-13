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
  setInitialTeam(team_id: string){
    console.debug("[DEBUG] Retriving team with id: ", team_id);
    const token = this.jwtService.getToken();
    if (token){
      this.apiService.getTeam(team_id).subscribe({
        next: team => { 
          this.currentTeamSubject.next(team);
          console.debug("[Team Service] set initial team: ", team); 
        },
        error: err => { 
          this.purgeTeam();
          console.error("[Team Service] error initially retriving Team: ", err); 
        }
      });
    } else {
      // remove all possible existing tokens and user info
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

  addTeam(team: Team){
    this.apiService.addTeam(team).subscribe({
      next: msg => { 
        console.debug(`[Team Service] Added Team: ${msg.message}`);
        this.currentTeamSubject.next(team); 
      },
      error: error => {
        console.error(`[Team Service] Added Team: ${error}`);
        this.currentTeamSubject.next({} as Team);
      } 
    })
  }

}
