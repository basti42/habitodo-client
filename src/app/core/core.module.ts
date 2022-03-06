import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpTokenInterceptor } from './interceptors';

import { JwtService } from './services/jwt.service';
import { ApiService } from './services';
import { UserService } from './services';


@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpTokenInterceptor, multi: true },
    JwtService,
    ApiService,
    UserService
  ]
})
export class CoreModule { }
