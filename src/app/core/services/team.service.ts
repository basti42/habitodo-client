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

  getTeam(team_id: string){
    this.apiService.getTeam(team_id).subscribe({
      next: team => { this.currentTeamSubject.next(team); },
      error: error => { this.currentTeamSubject.next({} as Team) }
    });
  }

  addTeam(team: Team){
    this.apiService.addTeam(team).subscribe({
      next: msg => { 
        console.debug(`Added Team: ${msg.message}`);
        this.currentTeamSubject.next(team); 
      },
      error: error => {
        console.error(`Added Team: ${error}`);
        this.currentTeamSubject.next({} as Team);
      } 
    })
  }

}
