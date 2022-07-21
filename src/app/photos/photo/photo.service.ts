import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, throwError } from 'rxjs';

import { Photo } from './photo';
import { PhotoComment } from './photo-comment';

const API = 'http://localhost:3000';

@Injectable({ providedIn: 'root' })
export class PhotoService {
  constructor(private http: HttpClient) {}

  listFromUser(userName: string) {
    return this.http.get<Photo[]>(API + '/' + userName + '/photos');
  }

  listFromUserPaginated(userName: string, page: number) {
    const params = new HttpParams().append('page', page.toString());
    return this.http.get<Photo[]>(API + '/' + userName + '/photos', { params });
  }

  upload(description: string, allowComments: boolean, file: File) {
    const formData = new FormData();
    formData.append('description', description);
    formData.append('allowComments', allowComments ? 'true' : 'false');
    formData.append('imageFile', file);

    return this.http.post(
      API + '/photos/upload',
      formData,
      {
        observe: 'events',
        reportProgress: true
      }
    );
  }

  findById(photoId: number) {
    return this.http.get<Photo>(API + '/photos/' + photoId);
  }

  getComments(photoId: number) {
    console.warn('chamei o getComments')
    return this.http.get<PhotoComment[]>(
      API + '/photos/' + photoId + '/comments',
    );
  }

  addComment(photoId: number, commentText: string): Observable<PhotoComment>{
    return this.http.post<PhotoComment>(API + '/photosxxx/' + photoId + '/comments', {
      commentText
    })
    //.subscribe(() => console.warn('eu sou o service'));
  }

  removePhoto(photoId: number) {
    return this.http.delete(API + '/photos/' + photoId);
  }

  like(photoId: number){
    return this.http.post(
      API + '/photos/' + photoId + '/like', {}, {observe: 'response'}
    )
    .pipe(map(() => true))
    .pipe(catchError(err => {
      return err.status == '304' ? of(false) : (err);
    }));
  }
}
