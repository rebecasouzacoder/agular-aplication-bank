import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CookieService } from 'ngx-cookie-service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ModalComponent } from './modal/modal.component';
import { HeaderComponent } from './header/header.component';

@NgModule({
  declarations: [SidebarComponent, ModalComponent, HeaderComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, HttpClientModule],
  providers: [CookieService],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    SidebarComponent,
    ModalComponent,
    HeaderComponent,
  ],
})
export class SharedModule {}
