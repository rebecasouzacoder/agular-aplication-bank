import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import { Observable, catchError, map } from 'rxjs';
import { ModalService } from 'src/app/shared/modal/service/modal.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Injectable()
export class JWTInterceptor implements HttpInterceptor {
  constructor(
    private modalService: ModalService,
    private router: Router,
    private coockieService: CookieService
  ) {}
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    console.log(request);
    return next.handle(request).pipe(
      map((res: any) => {
        return res;
      }),
      catchError((error) => {
        if (error.status === 401) {
          this.coockieService.delete('USER');
          this.router.navigate(['login']);
          return error;
        }
      })
    ) as Observable<HttpEvent<any>>;
  }
}
