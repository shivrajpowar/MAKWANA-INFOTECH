import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';

import { BusypageComponent } from './pages/busypage/busypage.component';
import { LoginComponent } from './pages/signup/login.component';
import { BusyLoginComponent } from './pages/busylogin/busylogin.component';
import { BusyRegisterComponent } from './pages/busy-register/busy-register.component';
import { CompanyComponent } from './pages/company/company.component';




export const routes: Routes = [
   {
      path: "", component: HomeComponent
   },
 
   { path: 'login', component: LoginComponent },
   // { path: '', redirectTo: 'busy-login', pathMatch: 'full' },
   { path: 'busy-login', component: BusyLoginComponent },
   { path: 'busy-register', component: BusyRegisterComponent },
   { path: 'busypage', component: BusypageComponent },
   { path:"company",component:CompanyComponent},
   { path: "products",
      loadChildren: () => import('./product-module/product-module.module').then(m => m.ProductModuleModule)
   },
   {
      path: "administration",
      loadChildren:() =>import('./administrationModule/administration.module').then(m=>m.AdministrationModule)
   
   },
   {
      path:"transaction",
      loadChildren:() =>import('./transactionsModule/transactions.module').then(m=>m.TransactionsModule)
   }





  

];
