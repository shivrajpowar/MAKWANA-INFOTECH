import { Routes } from '@angular/router';

import { BusyMobileComponent } from './Pages/pagesV/busy-mobile/busy-mobile.component';
import { HomeComponent } from './Pages/home/home.component';


export const routes: Routes = [
    {
      path:"",component:HomeComponent
    },
   // { path: 'home', component: HomeComponent },
{
   path:'busy-mobile',component:BusyMobileComponent
},
{
   path:"products",
   loadChildren: () => import('./product-module/product-module.module').then(m => m.ProductModuleModule) 
   
}
];
