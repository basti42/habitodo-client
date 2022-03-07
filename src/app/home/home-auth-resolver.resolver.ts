import { Injectable } from '@angular/core';
import { Router, Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

import { UserService } from '../core';

@Injectable({
  providedIn: 'root'
})
export class HomeAuthResolverResolver implements Resolve<boolean> {

  constructor(private router: Router, private userService: UserService) {};

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.userService.isAuthenticated.pipe(take(1));
  }
}
