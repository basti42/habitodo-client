import { Injectable } from '@angular/core';
import { BehaviorSubject, distinctUntilChanged } from 'rxjs';
import { Metrics } from '../models';
import { ApiService } from './api.service';
import { JwtService } from './jwt.service';

@Injectable({
  providedIn: 'root'
})
export class MetricService {

  private currentMetricsSubject = new BehaviorSubject<Array<Metrics>>([]);
  public currentMetrics = this.currentMetricsSubject.asObservable().pipe(distinctUntilChanged());

  constructor(
    private apiService : ApiService,
    private jwtService : JwtService
  ) { }

  
  load(){
    const token = this.jwtService.getToken();
    if (token) {
      this.apiService.getMetrics().subscribe({
        next: metrics => { this.currentMetricsSubject.next(metrics); },
        error: err => {
          this.currentMetricsSubject.next([]);
          console.error("Error setting metrics: ", err);
        }
      });
    }
  }


}
