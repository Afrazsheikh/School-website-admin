import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';

import { User } from '../models';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(private http: HttpClient)
  {}

  public login(payload): Observable<any> {
    return this.http.post(`${environment.apiBaseUrl}/userService/login`, payload);
  }

  public sign(): void {
    localStorage.setItem('token', 'token');
  }

  public signOut(): void {
    localStorage.removeItem('token');
  }

  public getUser(): Observable<User> {
    return of({
      name: 'John',
      lastName: 'Smith'
    });
  }
}
