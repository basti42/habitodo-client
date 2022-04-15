import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeAuthResolverResolver } from '../home/home-auth-resolver.resolver';
import { OverviewComponent } from './overview/overview.component';
import { ProfileComponent } from './profile.component';

const routes: Routes = [
  {path: 'settings/:name', component: ProfileComponent, canActivate: [HomeAuthResolverResolver]},
  {path: 'profile/:name', component: OverviewComponent, canActivate: [HomeAuthResolverResolver]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
