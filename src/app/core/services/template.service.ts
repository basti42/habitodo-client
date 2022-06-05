import { Injectable } from '@angular/core';
import { BehaviorSubject, distinctUntilChanged } from 'rxjs';
import { Template } from '../models';
import { ApiService } from './api.service';
import { JwtService } from './jwt.service';

@Injectable({
  providedIn: 'root'
})
export class TemplateService {

  private currentTemplateSubject = new BehaviorSubject<Array<Template>>([]);
  public currentTemplate = this.currentTemplateSubject.asObservable().pipe(distinctUntilChanged());

  constructor(
    private apiService: ApiService, 
    private jwtService: JwtService) { }


  load(teamid: String){
    const token = this.jwtService.getToken();
    if (token) {
      this.apiService.getTemplates(teamid).subscribe({
        next: templates => { 
          console.debug("[Template Service] Retrieved templates: ", templates);
          this.currentTemplateSubject.next(templates); 
        },
        error: err => {
          this.currentTemplateSubject.next([]);
          console.error("[Template Service] Error retrieving templates: ", err);
        }
      });
    }
  }


}
