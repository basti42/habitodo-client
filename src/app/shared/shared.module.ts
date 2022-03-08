import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ShowAuthedDirective } from './show-authed.directive';




@NgModule({
  declarations: [
    ShowAuthedDirective
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule, 
    ReactiveFormsModule
  ],
  exports: [
    CommonModule,
    HttpClientModule,
    ShowAuthedDirective,
    FormsModule, 
    ReactiveFormsModule
  ]
})
export class SharedModule { }
