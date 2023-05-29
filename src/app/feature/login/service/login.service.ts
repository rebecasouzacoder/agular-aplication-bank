import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
import { ILoginRequest } from '../models/login-request';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { ILoginResponse } from '../models/login-response';

@Injectable({
  providedIn: 'root',
})

export class LoginService {
  constructor(private http: HttpClient, private cookieService: CookieService) {}

  login(dto: ILoginRequest): Observable<ILoginResponse> {
    const body = new URLSearchParams();
    body.set('username', dto.usuario);
    body.set('password', dto.password);
    body.set('grant_type', 'password');
    body.set('client_id', 'sinple-web');
    body.set('client_secret', 'ZzVCevKWN9kQ1SNjahS6HhQ6yB4bqdc6');
   
    return this.http.post<ILoginResponse>(environment.api_login, body, {
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
      },
    });
  }

  setCookie(dto: string) {
    this.cookieService.set('USER', dto);
  }
}
