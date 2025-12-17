import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SalesOrderRoutingModule } from './sales-order-routing.module';
import { SalesOrderAddComponent } from './sales-order-add/sales-order-add.component';
import { SalesOrderModifyComponent } from './sales-order-modify/sales-order-modify.component';
import { SalesOrderListComponent } from './sales-order-list/sales-order-list.component';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SalesOrderRoutingModule,
    SalesOrderAddComponent,SalesOrderModifyComponent,SalesOrderListComponent
  ]
})
export class SalesOrderModule { }
