import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import { NgModule } from '@angular/core';
import { DashboardPageComponent } from './pages/dashboard/containers';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import {AuthGuard} from './pages/auth/guards';
import { SettingsComponent } from './pages/settings/settings.component';
import { HomeSectionsComponent } from './pages/home-sections/home-sections.component';
import { CareersComponent } from './pages/careers/careers.component';
import { StudCornerComponent } from './pages/stud-corner/stud-corner.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { AdmissionComponent } from './pages/admission/admission.component';
import { PublicMandComponent } from './pages/public-mand/public-mand.component';
import { GalleryComponent } from './pages/gallery/gallery.component';
import { GalleryImagesComponent } from './pages/gallery/gallery-images/gallery-images.component';
import { EnquiryComponent } from './pages/enquiry/enquiry.component';
import { FeedbakFormComponent } from './pages/feedbak-form/feedbak-form.component';
import { FacilityComponent } from './pages/facility/facility.component';

const routes: Routes = [
  /* {
    path: 'dashboard',
    pathMatch: 'full',
    canActivate: [AuthGuard],
    component: DashboardPageComponent
  }, */
  {
    path: 'settings',
    pathMatch: 'full',
    canActivate: [AuthGuard],
    component: SettingsComponent
  },
  {
    path: 'home-sections',
    pathMatch: 'full',
    canActivate: [AuthGuard],
    component: HomeSectionsComponent
  },
  {
    path: 'careers',
    pathMatch: 'full',
    canActivate: [AuthGuard],
    component: CareersComponent
  },
  {
    path: 'stud-corner',
    pathMatch: 'full',
    canActivate: [AuthGuard],
    component: StudCornerComponent
  },
  {
    path: 'aboutUs',
    pathMatch: 'full',
    canActivate: [AuthGuard],
    component: AboutUsComponent
  },
  {
    path: 'admissions',
    pathMatch: 'full',
    canActivate: [AuthGuard],
    component: AdmissionComponent
  },
  {
    path: 'enquiry',
    pathMatch: 'full',
    canActivate: [AuthGuard],
    component: EnquiryComponent
  },
  {
    path: 'feedback',
    pathMatch: 'full',
    canActivate: [AuthGuard],
    component: FeedbakFormComponent
  },
  {
    path: 'public-mend',
    pathMatch: 'full',
    canActivate: [AuthGuard],
    component: PublicMandComponent
  },
  {
    path: 'gallery',
    pathMatch: 'full',
    canActivate: [AuthGuard],
    component: GalleryComponent
  },
  {
    path: 'gallery/:id',
    pathMatch: 'full',
    canActivate: [AuthGuard],
    component: GalleryImagesComponent
  },
  {
    path: 'facility',
    canActivate: [AuthGuard],
    component: FacilityComponent
  },
  {
    path: 'typography',
    pathMatch: 'full',
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/typography/typography.module').then(m => m.TypographyModule)
  },
  {
    path: 'tables',
    pathMatch: 'full',
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/tables/tables.module').then(m => m.TablesModule)
  },
  {
    path: 'notification',
    pathMatch: 'full',
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/notification/notification.module').then(m => m.NotificationModule)
  },
  {
    path: 'ui',
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/ui-elements/ui-elements.module').then(m => m.UiElementsModule)
  },
 /*  {
    path: '404',
    component: NotFoundComponent
  }, */
  {
    path: 'login',
    loadChildren: () => import('./pages/auth/auth.module').then(m => m.AuthModule)
  },
  /* {
    path: '**',
    redirectTo: '404'
  } */
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
    preloadingStrategy: PreloadAllModules,
    relativeLinkResolution: 'legacy'
})
  ],
  exports: [RouterModule]
})

export class AppRoutingModule {
}
