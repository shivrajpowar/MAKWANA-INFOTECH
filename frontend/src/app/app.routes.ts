import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';

import { BusypageComponent } from './pages/busypage/busypage.component';
import { LoginComponent } from './pages/signup/login.component';
import { BusyLoginComponent } from './pages/busylogin/busylogin.component';
import { BusyRegisterComponent } from './pages/busy-register/busy-register.component';
import { CompanyComponent } from './pages/company/company.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';




export const routes: Routes = [
   { path: "", component: HomeComponent },
   { path: 'login', component: LoginComponent },
   { path: 'busy-login', component: BusyLoginComponent },
   { path: 'busy-register', component: BusyRegisterComponent },

   { path: "company", component: CompanyComponent },
   {
      path: "products",
      loadChildren: () => import('./product-module/product-module.module').then(m => m.ProductModuleModule)
   },
   {
      path: "Aboutus",
      component:AboutUsComponent
   },
   

   {
      path: 'busypage',
      component: BusypageComponent,
      children: [
          // default page after login
         { path: '', redirectTo: 'company', pathMatch: 'full' },
         { path: 'company', component: CompanyComponent },

         {
            path: 'accountMaster',
            loadChildren: () =>
               import('./account-master-module/account-master-module.module')
                  .then(m => m.AccountMasterModuleModule)
         },

         {
            path: 'itemMaster',
            loadChildren: () =>
               import('./item-master/item-master.module')
                  .then(m => m.ItemMasterModule)
         },

         {
            path: 'salesOrder',
            loadChildren: () =>
               import('./sales-order/sales-order.module')
                  .then(m => m.SalesOrderModule)
         },

         {
            path: 'sales',
            loadChildren: () =>
               import('./sales/sales.module')
                  .then(m => m.SalesModule)
         },

         {
            path: 'receipt',
            loadChildren: () =>
               import('./receipt-module/receipt-module.module')
                  .then(m => m.ReceiptModuleModule)
         },

        
      ]
   }






];
