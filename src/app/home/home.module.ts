import { NgModule } from '@angular/core';

import { HomeComponent } from './home.component';
import { HomeAuthResolverResolver } from './home-auth-resolver.resolver';
import { SharedModule } from '../shared';
import { HomeRoutingModule } from './home-routing.module';


@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    SharedModule,
    HomeRoutingModule
  ],
  providers: [
    HomeAuthResolverResolver
  ]
})
export class HomeModule { }
