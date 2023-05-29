import { Injectable } from '@angular/core';
import { 
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import jwt_decode from 'jwt-decode';
import { IUser } from './models/user';

@Injectable({
  providedIn: 'root'
})
export class MyService {
  private _data: any;
  get data(): any { return this._data }
  set data(value: any) { this._data = value; }
}


@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  
  constructor(private router: Router, private cookieService: CookieService) { }
  
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if(this.cookieService.get('USER')) {
      return this.verifyPermission(route.data['role'])
    }  else {
      this.router.navigate(['login'])
      return false;
    }
  }
  
  get token(): string {
    return this.User.access_token;
  }

  get User(): IUser {
     return JSON.parse(this.cookieService.get('USER'));
  }

  get Permission(): string[] {
    return this.User.roles.authorities;
  }

  public verifyPermission(permission: string) {
    if(this.Permission.includes(permission))  {
      return true;
    } else {
      this.router.navigate(['dashboard/home'])
      return false;
    }
  }

 
  public decodePayloadJWT(token: string): any {
    try {
      return jwt_decode(token);
    } catch (Error) {
      return null;
    }
  }
}