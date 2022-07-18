import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Alert, AlertType } from './alert';
import { NavigationStart, Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AlertService {

  alertSubject: Subject<Alert> = new Subject<Alert>();
  keepAfterRouteChange = false;

  constructor(router: Router){
    router.events.subscribe(event => {
      if(event instanceof NavigationStart) {
        if(this.keepAfterRouteChange) {
          this.keepAfterRouteChange = false;
        } else {
          this.clearImmediate();
        }
      }
    })
  }

  danger(message: string, keepAfterRouteChange: boolean = false){
    this.alert(AlertType.DANGER, message, keepAfterRouteChange);
  }

  warning(message: string, keepAfterRouteChange: boolean = false){
    this.alert(AlertType.WARNING, message, keepAfterRouteChange);
  }

  sucess(message: string, keepAfterRouteChange: boolean = false){
    this.alert(AlertType.SUCCESS, message, keepAfterRouteChange);
  }

  info(message: string, keepAfterRouteChange: boolean = false){
    this.alert(AlertType.INFO, message, keepAfterRouteChange);
  }

  private alert(alertType: AlertType, message: string, keepAfterRouteChange: boolean){
    this.keepAfterRouteChange = keepAfterRouteChange;
    this.alertSubject.next(new Alert(alertType, message));
  }

  getAlert(){
    return this.alertSubject.asObservable();
  }

  clearImmediate(){
    this.alertSubject;
  }
}