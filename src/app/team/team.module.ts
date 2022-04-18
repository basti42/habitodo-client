import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TeamRoutingModule } from './team-routing.module';
import { TeamCreatorComponent } from './team-creator/team-creator.component';
import { SharedModule } from '../shared';


@NgModule({
  declarations: [
    TeamCreatorComponent
  ],
  imports: [
    CommonModule,
    TeamRoutingModule,
    SharedModule
  ],
  exports: [
    TeamRoutingModule,
    TeamCreatorComponent
  ]
})
export class TeamModule { }
