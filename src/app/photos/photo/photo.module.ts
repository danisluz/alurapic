import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { PhotoComponent } from './photo.component';
@NgModule({
  declarations: [PhotoComponent],
  exports: [PhotoComponent],
  imports: [
    CommonModule,
    HttpClientModule
  ]
})
export class PhotoModule {
}
