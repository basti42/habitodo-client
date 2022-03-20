import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OverviewComponent } from './overview/overview.component';
import { ProfileComponent } from './profile.component';

const routes: Routes = [
  {path: 'settings/:name', component: ProfileComponent},
  {path: 'profile/:name', component: OverviewComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
