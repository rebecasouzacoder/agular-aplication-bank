import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthGuardService } from 'src/app/core/guard/auth-guard.service';
import { IListBank } from './models/list-bank-response';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  constructor(private http: HttpClient, private auth: AuthGuardService) {}

  getBank(
    pesquisa?: string,
    pageNumber = 0,
    pageSize = 10,
    sort = 'descricao'
  ): Observable<IListBank> {
    return this.http.get<IListBank>(
      `${environment.api_url}/v1/bancos?pesquisa=${
        pesquisa ? pesquisa.trim() : ''
      }&pageNumber=${pageNumber}&pageSize=${pageSize}&sort=${sort}`,
      {
        headers: {
          Authorization: 'Bearer ' + this.auth.token,
          'content-type': 'application/json',
        },
      }
    );
  }

  deleteBank(dto: any) {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + this.auth.token,
      }),
      body: {"listIds": dto}
    };

    return this.http.delete(
      `${environment.api_url}/v1/bancos/listIds`,
      options
    );
  }
}
