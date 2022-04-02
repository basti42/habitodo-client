import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ShowAuthedDirective } from './show-authed.directive';
import { ListErrorsComponent } from './list-errors/list-errors.component';




@NgModule({
  declarations: [
    ShowAuthedDirective,
    ListErrorsComponent
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
    ReactiveFormsModule,
    ListErrorsComponent
  ]
})
export class SharedModule { }
