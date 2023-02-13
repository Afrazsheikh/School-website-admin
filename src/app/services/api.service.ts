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

  //section 6
  getSection6(): Observable<any> {
    return this.httpClient.get(environment.apiBaseUrl + 'adminService/getSection?secType=section6');
  }

  deleteSec6Slide(slideId: string): Observable<any> {
    return this.httpClient.delete(environment.apiBaseUrl + 'adminService/deleteSection6/' + slideId);
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
  //AboutUS
  getAboutUS(): Observable<any> {
    return this.httpClient.get(environment.apiBaseUrl + 'adminService/getSection?secType=aboutUs');
  }

  updateAboutUs(postData: FormData): Observable<any> {
    return this.httpClient.post(environment.apiBaseUrl + 'adminService/updateAboutUs', postData);
  }
  updateAbouUsMessage(postData: FormData): Observable<any> {
    return this.httpClient.post(environment.apiBaseUrl + 'adminService/updateAboutUSRM', postData);
  }
  //admission
  updateAdmission(postData: FormData): Observable<any> {
    return this.httpClient.post(environment.apiBaseUrl + 'adminService/updateAdmData', postData);
  }
  getAdmission(): Observable<any> {
    return this.httpClient.get(environment.apiBaseUrl + 'adminService/getSection?secType=admission');
  }

  // Gallery Album
  getAlbums(): Observable<any> {
    return this.httpClient.get(environment.apiBaseUrl + 'adminService/getAlbums');
  }

  addAlbum(postData: any): Observable<any> {
    return this.httpClient.post(environment.apiBaseUrl + 'adminService/addAlbum', postData);
  }

  deleteAlbum(album: string): Observable<any> {
    return this.httpClient.delete(environment.apiBaseUrl + 'adminService/deleteAlbum/' + album);
  }

  getGalleries(album): Observable<any> {
    return this.httpClient.get(environment.apiBaseUrl + 'adminService/getGalleries?album=' + album);
  }

  addGallery(postData: FormData): Observable<any> {
    return this.httpClient.post(environment.apiBaseUrl + 'adminService/addGallery', postData);
  }

  deleteGallery(album: string, fileId: string): Observable<any> {
    return this.httpClient.delete(environment.apiBaseUrl + 'adminService/deleteGallery/' + album + '?fileId=' + fileId);
  }

  //documents
  getDocuments(): Observable<any> {
    return this.httpClient.get(environment.apiBaseUrl + 'adminService/getSection?secType=documents');
  }

  addDocs(postData: FormData): Observable<any> {
    return this.httpClient.post(environment.apiBaseUrl + 'adminService/addDocument', postData);
  }
  //forms

  getEnquiry(): Observable<any> {
    return this.httpClient.get(environment.apiBaseUrl + 'userService/getEnquiry');
  }

  getFeedback(): Observable<any> {
    return this.httpClient.get(environment.apiBaseUrl + 'userService/getfeedback');
  }


}
