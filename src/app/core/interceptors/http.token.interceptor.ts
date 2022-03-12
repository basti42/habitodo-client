import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor} from '@angular/common/http';
import { Observable } from 'rxjs';

import { JwtService } from '../services/jwt.service';

@Injectable()
export class HttpTokenInterceptor implements HttpInterceptor {
  constructor(private jwtService: JwtService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // console.debug("INTERCEPTOR PRE HEADERS: ", req.headers);
    const token = this.jwtService.getToken();
    // console.debug("INTERCEPTOR TOKEN: ", token);

    req.headers.append('Content-Type', 'application/json');
    req.headers.append('Accept', 'application/json')

    if (token) {
      req = req.clone({ headers: req.headers.append('authorization', `Bearer ${token}`) });
    }

    // console.debug("INTERCEPTOR POST HEADERS: ", req.headers);
    return next.handle(req);
  }
}
