import { NgModule } from '@angular/core';
import { AlertComponent } from './alert.component';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  declarations: [AlertComponent],
  exports: [AlertComponent],
  imports: [
    CommonModule,
    BrowserModule
  ]
})

export class AlertModule { }