import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ShowAuthedDirective } from './show-authed.directive';
import { ListErrorsComponent } from './list-errors/list-errors.component';
import { CardComponent } from './components/card/card.component';
import { NavItemComponent } from './components/nav-item/nav-item.component';




@NgModule({
  declarations: [
    ShowAuthedDirective,
    ListErrorsComponent,
    CardComponent,
    NavItemComponent
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
    ListErrorsComponent,
    CardComponent
  ]
})
export class SharedModule { }
