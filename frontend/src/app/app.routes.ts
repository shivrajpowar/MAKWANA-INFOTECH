import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { BusyMobileComponent } from './pages/pages/busy-mobile/busy-mobile.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  
  { path: 'login', loadComponent: () => import('./pages/features/auth/login/login.component').then(m => m.LoginComponent) },

  { path: 'busy-mobile', component: BusyMobileComponent },
  
  { path: '**', redirectTo: '' },
];
