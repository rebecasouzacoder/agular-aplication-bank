import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AuthGuardService } from 'src/app/core/guard/auth-guard.service';
import { DashboardComponent } from './dashboard.component';
import { BankComponent } from './bank/bank.component';
import { BankDetailsComponent } from './bank/bank-details/bank-details.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      {
        path: 'home',
        component: HomeComponent,
        canActivate: [AuthGuardService],
        data: { role: 'ROLE_BANCO_LST' },
      },
      {
        path: 'bank',
        component: BankComponent,
        canActivate: [AuthGuardService],
        data: { role: 'ROLE_BANCO_ADD' },
      },
      {
        path: 'bank/:id',
        component: BankComponent,
        canActivate: [AuthGuardService],
        data: { role: 'ROLE_BANCO_EDT' },
     
      },
      {
        path: 'bank-details/:id',
        component: BankDetailsComponent,
        canActivate: [AuthGuardService],
        data: { role: 'ROLE_BANCO_LST' },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
