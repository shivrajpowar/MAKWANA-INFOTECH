import { Routes } from '@angular/router';
import { PlaceOrderComponent } from './component/place-order/place-order.component';
import { ProductPageComponent } from './component/product-page/product-page.component';
import { LoginComponent } from './component/login/login.component';
import { AddressComponent } from './component/address/address.component';
import { PaymentComponent } from './component/payment/payment.component';
import { SummaryComponent } from './component/summary/summary.component';



export const routes: Routes = [
    {path:'place-order',component:PlaceOrderComponent},
    {path:'product-page',component:ProductPageComponent},
    { path: 'login', component: LoginComponent},
    {path:'address',component:AddressComponent},
    {path:'payment',component:PaymentComponent},
    {path:'summary',component:SummaryComponent},
    {path:'add-address',component:AddressComponent},
    { path: '**', redirectTo: 'product' }
];
