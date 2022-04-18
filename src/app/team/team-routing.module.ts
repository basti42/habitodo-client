import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TeamCreatorComponent } from './team-creator/team-creator.component';

const routes: Routes = [
  {'path': 'team/create', component: TeamCreatorComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeamRoutingModule { }
