import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { Router } from "@angular/router";
import { CookieService } from "ngx-cookie-service";
import { AuthGuardService } from "src/app/core/guard/auth-guard.service";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"]
})
export class HeaderComponent implements OnInit {
  public name!: string; 
 
  constructor(private authService: AuthGuardService, private router: Router, private coockieService: CookieService) {}
  
  ngOnInit(): void {
    this.name = this.authService.User.roles.name;
  }

  logout() {
    this.coockieService.delete('USER');
    this.router.navigate(['login'])
  }
}
