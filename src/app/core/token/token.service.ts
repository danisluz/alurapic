import { Injectable } from '@angular/core';

const KEY = 'authToken';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  hasToken(){
    return !!this.getToken();
  }
  setToken(token: string){
    window.localStorage.setItem(KEY, token);
  }
  getToken(){
    return window.localStorage.getItem(KEY);
  }
  removeToken(){
    return window.localStorage.removeItem(KEY);
  }
}
