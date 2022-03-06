import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { ShowAuthedDirective } from './show-authed.directive';




@NgModule({
  declarations: [
    ShowAuthedDirective
  ],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  exports: [
    CommonModule,
    HttpClientModule,
    ShowAuthedDirective
  ]
})
export class SharedModule { }
