import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { UserService } from '../user/user.service';

const API_URL = 'http://localhost:3000'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
    private userService: UserService
    ) { }

  authenticate(userName: string, password: string){
    return this.http
      .post(
        API_URL + '/user/login',
        { userName, password },
        { observe: 'response' }
      )
      .pipe(tap( resp => {
        const authToken = resp.headers.get('x-access-token');
        if (authToken) {
          this.userService.setToken(authToken);
          console.log(`User ${userName} authenticated with token ${authToken}`)
        }
      }))
  }
}
