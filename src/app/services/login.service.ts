import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  
  providedIn: 'root'
})
export class LoginService {

  constructor(private httpClient: HttpClient){
  }



  login(data): Observable<any>
  {
    return this.httpClient.post(environment.apiBaseUrl + 'adminService/adminLogin', data);
  }




sellingListing(data): Observable<any>
{
  return this.httpClient.post(environment.apiBaseUrl + 'adminService/sellingListing', data);
}

resetPassword(data) : Observable <any>
{
  return this.httpClient.post(environment.apiBaseUrl + 'adminService/resetPassword', data);
}
}

