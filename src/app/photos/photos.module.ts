import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { PhotoFormModule } from './photo-form/photo-form.module';
import { PhotoListModule } from './photo-list/photo-list.module';

import { PhotoComponent } from './photo/photo.component';
import { PhotoModule } from './photo/photo.module';

@NgModule({
  declarations: [
  ],
  exports: [
    PhotoComponent,
  ],
  imports: [
    HttpClientModule,
    CommonModule,
    PhotoFormModule,
    PhotoListModule,
    PhotoModule,
  ],
})
export class PhotosModule {}
