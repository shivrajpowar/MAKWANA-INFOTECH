import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductComponent } from './product/product.component';
import { VeiwProductComponent } from './veiw-product/veiw-product.component';
import { CartComponent } from './cart/cart.component';

const routes: Routes = [
   { path: '', component: ProductComponent },
  { path: 'view-product/:id', component: VeiwProductComponent },
  { path: 'cart', component: CartComponent }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductModuleRoutingModule { }
