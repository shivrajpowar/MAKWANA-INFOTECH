import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductComponent } from './product/product.component';
import { VeiwProductComponent } from './veiw-product/veiw-product.component';
import { CartComponent } from './cart/cart.component';
import { PlaceOrderComponent } from './place-order/place-order.component';
import { PaymentMethodComponent } from './payment-method/payment-method.component';

const routes: Routes = [
   { path: '', component: ProductComponent },
  { path: 'view-product/:id', component: VeiwProductComponent },
  { path: 'cart', component: CartComponent },
  {path:'place-order',component:PlaceOrderComponent},
  {path:'payment-method',component:PaymentMethodComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductModuleRoutingModule { }
