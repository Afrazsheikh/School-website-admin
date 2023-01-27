import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  private routes = [
    'api/v1/adminService/addLogo',
    'api/v1/adminService/getSettings',
    'api/v1/adminService/updateSettings',
    'api/v1/adminService/addSection',
    'api/v1/adminService/getSection',
    'api/v1/adminService/updateSection',
    'api/v1/adminService/deleteSection',
    'api/v1/adminService/addSection2Img',
    'api/v1/adminService/addSection3Img'
  ];

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let token = localStorage.getItem('token');

    if(this.allowToken(request) && token) {
      request = request.clone({
        setHeaders: {
          Authorization: 'Bearer ' + token
        }
      })
    }

    return next.handle(request);
  }

  private allowToken(request: HttpRequest<any>): boolean {
    return new RegExp(this.routes.join('|')).test(request.url);
  }

}
