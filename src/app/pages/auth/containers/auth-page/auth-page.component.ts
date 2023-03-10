import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../services';
import { routes } from '../../../../consts';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-auth-page',
  templateUrl: './auth-page.component.html',
  styleUrls: ['./auth-page.component.scss']
})
export class AuthPageComponent {
  public todayDate: Date = new Date();
  public routers: typeof routes = routes;

  constructor(
    private service: AuthService,
    private router: Router,
    private toaster: ToastrService
  ) { }

  public sendLoginForm(payload): void {
    this.service.login(payload).subscribe((resp) => {
      console.log(resp);
      localStorage.setItem('token', resp.token);
      this.router.navigate([this.routers.SETTINGS]);
    },
    (err) => {
      this.toaster.error(null, err.error.message);
      console.log(err);
    });
  }

  public sendSignForm(): void {
    this.service.sign();

    this.router.navigate([this.routers.DASHBOARD]).then();
  }
}
