import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';
import { SharedModule } from '../shared';
import { OverviewComponent } from './overview/overview.component';
import { UploadAvatarComponent } from './upload-avatar/upload-avatar.component';

@NgModule({
  declarations: [
    ProfileComponent,
    OverviewComponent,
    UploadAvatarComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ProfileRoutingModule
  ]
})
export class ProfileModule { }
