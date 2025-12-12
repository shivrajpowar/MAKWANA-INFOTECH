import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { BusyMobileComponent } from './pages/pagesV/busy-mobile/busy-mobile.component';

 


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
