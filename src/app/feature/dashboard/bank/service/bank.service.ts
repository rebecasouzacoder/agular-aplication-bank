import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { AuthGuardService } from 'src/app/core/guard/auth-guard.service';
import { environment } from 'src/environments/environment.prod';
import { IBankDetailsResponse } from './models/bank-deitals-response';

@Injectable({
  providedIn: 'root',
})
export class BankService {
  constructor(private http: HttpClient, private auth: AuthGuardService) {}

  getBankById(id: number): Observable<IBankDetailsResponse> {
    return this.http.get<IBankDetailsResponse>(
      `${environment.api_url}/v1/bancos/${id}`,
      {
        headers: {
          Authorization: 'Bearer ' + this.auth.token,
          'content-type': 'application/json',
        },
      }
    );
  }

  deleteBankById(id: number) {
    return this.http.delete(`${environment.api_url}/v1/bancos/${id}`, {
      headers: {
        Authorization: 'Bearer ' + this.auth.token,
        'content-type': 'application/json',
      },
    });
  }

  editBank(
    id: number,
    dto: IBankDetailsResponse
  ): Observable<IBankDetailsResponse> {
    return this.http.put<IBankDetailsResponse>(
      `${environment.api_url}/v1/bancos/${id}`,
      dto,
      {
        headers: {
          Authorization: 'Bearer ' + this.auth.token,
          'content-type': 'application/json',
        },
      }
    );
  }

  createBank(dto: IBankDetailsResponse): Observable<IBankDetailsResponse> {
    return this.http.post<IBankDetailsResponse>(
      `${environment.api_url}/v1/bancos`,
      dto,
      {
        headers: {
          Authorization: 'Bearer ' + this.auth.token,
          'content-type': 'application/json',
        },
      }
    );
  }
}
