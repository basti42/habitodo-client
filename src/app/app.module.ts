import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HeaderComponent, SharedModule } from './shared';
import { HomeModule } from './home/home.module';
import { AuthModule } from './auth/auth.module';

import { CoreModule } from './core';
import { ProfileModule } from './profile/profile.module';

@NgModule({
  declarations: [ AppComponent, HeaderComponent ],
  imports: [
    BrowserModule,
    CoreModule,
    SharedModule,
    AppRoutingModule,
    HomeModule,
    AuthModule,
    ProfileModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
