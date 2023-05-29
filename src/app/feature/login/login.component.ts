import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from './service/login.service';
import { ILoginRequest } from './models/login-request';
import { AuthGuardService } from 'src/app/core/guard/auth-guard.service';
import { ILoginResponse } from './models/login-response';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  form!: FormGroup;
  errorForm!: boolean;
  isLoading!: boolean;
  messageError!: string;
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private service: LoginService,
    private authService: AuthGuardService
  ) {}

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.form = this.formBuilder.group({
      password: ['', [Validators.required]],
      usuario: ['', Validators.compose([Validators.required])],
    });
  }

  verifyForm(): boolean {
    if (!this.form.valid) {
      this.errorForm = true;
      return false;
    }
    return true;
  }

  login() {
    if (this.verifyForm()) {
      this.isLoading = true;

      const dto: ILoginRequest = {
        password: this.form.get('password')?.value,
        usuario: this.form.get('usuario')?.value,
      };

      return this.service.login(dto).subscribe(
        (result: ILoginResponse) => {
          const dto = {
            ...result,
            roles: this.authService.decodePayloadJWT(result.access_token),
          };

          this.service.setCookie(JSON.stringify(dto));
          this.isLoading = false;
          this.router.navigate(['dashboard/home']);
        },
        (error) => {
          this.setError(error);
        }
      );
    }
    return;
  }

  setError(error: any) {
    this.isLoading = false;
    this.errorForm = true;
    this.messageError =
      error.status === 401
        ? 'Usuário ou senha inválido.'
        : 'Houve um erro ao realizar a operação!';
    setTimeout(() => {
      this.errorForm = false;
    }, 2000);
  }
}
