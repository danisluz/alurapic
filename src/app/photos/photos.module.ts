import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { PhotoFormModule } from './photo-form/photo-form.module';
import { PhotoListModule } from './photo-list/photo-list.module';
import { PhotosComponent } from './photo-list/photos/photos.component';
import { PhotoModule } from './photo/photo.module';


@NgModule({
  imports: [
    HttpClientModule,
    CommonModule,
    PhotoFormModule,
    PhotoModule,
    PhotoListModule
  ],
})
export class PhotosModule {
}
