import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { PhotoListComponent } from './photo-list/photo-list.component';
import { PhotoComponent } from './photo/photo.component';

@NgModule({
  declarations: [
    PhotoComponent,
    PhotoListComponent
  ],
  exports: [PhotoComponent],
  imports: [
    HttpClientModule,
    CommonModule
  ],
})
export class PhotosModule {}
