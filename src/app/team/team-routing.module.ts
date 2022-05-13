import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TeamCreatorComponent } from './team-creator/team-creator.component';
import { HomeAuthResolverResolver } from '../home/home-auth-resolver.resolver';
import { TeamOverviewComponent } from './team-overview/team-overview.component';

const routes: Routes = [
  {'path': 'team/create', component: TeamCreatorComponent, canActivate: [HomeAuthResolverResolver]},
  {'path': 'team', component: TeamOverviewComponent, canActivate: [HomeAuthResolverResolver]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeamRoutingModule { }
