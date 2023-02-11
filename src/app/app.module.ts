import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { ToastrModule } from 'ngx-toastr';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { AppRoutingModule } from './app-routing.module';
import { DashboardModule } from './pages/dashboard/dashboard.module';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { AuthModule } from './pages/auth/auth.module';
import { NgxEchartsModule } from 'ngx-echarts';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { SettingsComponent } from './pages/settings/settings.component';
import { AuthInterceptor } from './services/http-interceptor/auth.interceptor';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeSectionsComponent } from './pages/home-sections/home-sections.component';
import { MatTabsModule } from '@angular/material/tabs';
import { CareersComponent } from './pages/careers/careers.component';
import { StudCornerComponent } from './pages/stud-corner/stud-corner.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { AdmissionComponent } from './pages/admission/admission.component';
import { PublicMandComponent } from './pages/public-mand/public-mand.component';
import { GalleryComponent } from './pages/gallery/gallery.component';
import { GalleryImagesComponent } from './pages/gallery/gallery-images/gallery-images.component';
import { MatIconModule } from '@angular/material/icon';
import { QuillModule } from 'ngx-quill';

@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
    SettingsComponent,
    HomeSectionsComponent,
    CareersComponent,
    StudCornerComponent,
    AboutUsComponent,
    AdmissionComponent,
    PublicMandComponent,
    GalleryComponent,
    GalleryImagesComponent
  ],
  imports: [
    BrowserModule,
    SharedModule,
    AuthModule,
    DashboardModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    AppRoutingModule,
    ToastrModule.forRoot({positionClass: 'toast-center-center'}),
    MatCardModule,
    MatTabsModule,
    MatIconModule,
    MatButtonModule,
    HttpClientModule,
    QuillModule.forRoot(),
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts')
    })
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
