import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private httpClient: HttpClient) { }

  getSettings(): Observable<any> {
    return this.httpClient.get(environment.apiBaseUrl + 'adminService/getSettings');
  }

  updateLogo(postData: FormData): Observable<any> {
    return this.httpClient.post(environment.apiBaseUrl + 'adminService/addLogo', postData);
  }

  updateSettings(postData: any): Observable<any> {
    return this.httpClient.post(environment.apiBaseUrl + 'adminService/updateSettings', postData);
  }

  // For Section 1
  getSection1() {
    return this.httpClient.get(environment.apiBaseUrl + 'adminService/getSection?secType=section1');
  }

  addHomeSlide(postData: FormData) {
    return this.httpClient.post(environment.apiBaseUrl + 'adminService/addSection', postData);
  }

  editHomeSlide(postData: FormData) {
    return this.httpClient.put(environment.apiBaseUrl + 'adminService/updateSection', postData);
  }

  deleteHomeSlide(slideId: string) {
    return this.httpClient.delete(environment.apiBaseUrl + 'adminService/deleteSection/' + slideId);
  }

  // For Section 2
  getSection2() {
    return this.httpClient.get(environment.apiBaseUrl + 'adminService/getSection?secType=section2');
  }

  updateSection2(postData: any): Observable<any> {
    return this.httpClient.post(environment.apiBaseUrl + 'adminService/addSection', postData);
  }

  updateSection2Img(postData: FormData): Observable<any> {
    return this.httpClient.post(environment.apiBaseUrl + 'adminService/addSection2Img', postData);
  }

  //For Section 3
  getSection3() {
    return this.httpClient.get(environment.apiBaseUrl + 'adminService/getSection?secType=section3');
  }

  updateSection3Img(postData: FormData): Observable<any> {
    return this.httpClient.post(environment.apiBaseUrl + 'adminService/addSection3Img', postData);
  }
}
