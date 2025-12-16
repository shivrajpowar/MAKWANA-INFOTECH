import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductModuleRoutingModule } from './product-module-routing.module';
import { ProductComponent } from './product/product.component';
import { CartComponent } from './cart/cart.component';




@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ProductModuleRoutingModule,
    ProductComponent,ProductComponent,CartComponent
  ]
})
export class ProductModuleModule { }
