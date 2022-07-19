import { LoadingType } from './loading-type';
import { Injectable } from '@angular/core';
import { startWith, Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class LoadingService {
  
  LoadingSubject = new Subject<LoadingType>;

  getLoading(){
    return this.LoadingSubject
      .asObservable()
      .pipe(startWith(LoadingType.STOPPED));
  }

  start(){
    return this.LoadingSubject.next(LoadingType.LOADING);
  }

  stop(){
    return this.LoadingSubject.next(LoadingType.STOPPED);
  }
}