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
  getSection1(): Observable<any> {
    return this.httpClient.get(environment.apiBaseUrl + 'adminService/getSection?secType=section1');
  }

  addHomeSlide(postData: FormData): Observable<any> {
    return this.httpClient.post(environment.apiBaseUrl + 'adminService/addSection', postData);
  }

  editHomeSlide(postData: FormData): Observable<any> {
    return this.httpClient.put(environment.apiBaseUrl + 'adminService/updateSection', postData);
  }

  deleteHomeSlide(slideId: string): Observable<any> {
    return this.httpClient.delete(environment.apiBaseUrl + 'adminService/deleteSection/' + slideId);
  }

  // For Section 2
  getSection2(): Observable<any> {
    return this.httpClient.get(environment.apiBaseUrl + 'adminService/getSection?secType=section2');
  }

  updateSection2(postData: any): Observable<any> {
    return this.httpClient.post(environment.apiBaseUrl + 'adminService/addSection', postData);
  }

  updateSection2Img(postData: FormData): Observable<any> {
    return this.httpClient.post(environment.apiBaseUrl + 'adminService/addSection2Img', postData);
  }

  //For Section 3
  getSection3(): Observable<any> {
    return this.httpClient.get(environment.apiBaseUrl + 'adminService/getSection?secType=section3');
  }

  updateSection3Img(postData: FormData): Observable<any> {
    return this.httpClient.post(environment.apiBaseUrl + 'adminService/addSection3Img', postData);
  }

  //For Section 7
  getSection7(): Observable<any> {
    return this.httpClient.get(environment.apiBaseUrl + 'adminService/getSection?secType=section7');
  }

  updateSection7Img(postData: FormData): Observable<any> {
    return this.httpClient.post(environment.apiBaseUrl + 'adminService/addSection7Img', postData);
  }

  updateSection7(postData: any): Observable<any> {
    return this.httpClient.post(environment.apiBaseUrl + 'adminService/addSection', postData);
  }

  // For Section 6 + Gallery
  getGalleries(): Observable<any> {
    return this.httpClient.get(environment.apiBaseUrl + 'adminService/getSection?secType=galleries');
  }

  addGallery(postData: FormData): Observable<any> {
    return this.httpClient.post(environment.apiBaseUrl + 'adminService/addGallery', postData);
  }

  deleteGallery(fileId: string): Observable<any> {
    return this.httpClient.delete(environment.apiBaseUrl + 'adminService/deleteGallery/' + fileId);
  }

  //section4
  getSection4(): Observable<any> {
    return this.httpClient.get(environment.apiBaseUrl + 'adminService/getSection?secType=section4');
  }

  addFrontSlide(postData: FormData): Observable<any> {
    return this.httpClient.post(environment.apiBaseUrl + 'adminService/addSection', postData);
  }

  updateSection4Img(postData: FormData): Observable<any> {
    return this.httpClient.post(environment.apiBaseUrl + 'adminService/addSection4Img', postData);
  }

  editSection4Slide(postData: FormData): Observable<any> {
    return this.httpClient.put(environment.apiBaseUrl + 'adminService/updateSection', postData);
  }

  deleteSec4Slide(slideId: string): Observable<any> {
    return this.httpClient.delete(environment.apiBaseUrl + 'adminService/deleteSection4/' + slideId);
  }

  //section 5
  getSection5(): Observable<any> {
    return this.httpClient.get(environment.apiBaseUrl + 'adminService/getSection?secType=section5');
  }

  deleteSec5Slide(slideId: string): Observable<any> {
    return this.httpClient.delete(environment.apiBaseUrl + 'adminService/deleteSection5/' + slideId);
  }

  // Menu APIS
  // Careers
  getCareerData(): Observable<any> {
    return this.httpClient.get(environment.apiBaseUrl + 'adminService/getSection?secType=careers');
  }

  updateCareers(postData: FormData): Observable<any> {
    return this.httpClient.post(environment.apiBaseUrl + 'adminService/updateCareer', postData);
  }

  // Student Corner
  getStudentData(): Observable<any> {
    return this.httpClient.get(environment.apiBaseUrl + 'adminService/getSection?secType=studCorner');
  }

  updateStudData(postData: FormData): Observable<any> {
    return this.httpClient.post(environment.apiBaseUrl + 'adminService/updateStudData', postData);
  }
}
