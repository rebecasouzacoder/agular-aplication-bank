import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { HomeComponent } from './home/home.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { BankComponent } from './bank/bank.component';
import { BankDetailsComponent } from './bank/bank-details/bank-details.component';
import { AuthGuardService } from 'src/app/core/guard/auth-guard.service';


@NgModule({
  declarations: [
    DashboardComponent,
    HomeComponent,
    BankComponent,
    BankDetailsComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule
  ], 

})
export class DashboardModule { }
