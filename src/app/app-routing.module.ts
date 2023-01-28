import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import { NgModule } from '@angular/core';
import { DashboardPageComponent } from './pages/dashboard/containers';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import {AuthGuard} from './pages/auth/guards';
import { SettingsComponent } from './pages/settings/settings.component';
import { HomeSectionsComponent } from './pages/home-sections/home-sections.component';
import { CareersComponent } from './pages/careers/careers.component';
import { StudCornerComponent } from './pages/stud-corner/stud-corner.component';

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
  {
    path: '404',
    component: NotFoundComponent
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: '**',
    redirectTo: '404'
  }
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
