import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeamOverviewComponent } from './team-overview/team-overview.component';
import { TeamCreatorComponent } from './team-creator/team-creator.component';



@NgModule({
  declarations: [
    TeamOverviewComponent,
    TeamCreatorComponent
  ],
  imports: [
    CommonModule
  ]
})
export class TeamModule { }
