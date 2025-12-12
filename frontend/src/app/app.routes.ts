import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { BusyMobileComponent } from './pages/pages/busy-mobile/busy-mobile.component';

export const routes: Routes = [
    {
      path:"",component:HomeComponent
    },
   // { path: 'home', component: HomeComponent },
{
   path:'busy-mobile',component:BusyMobileComponent
}
];
