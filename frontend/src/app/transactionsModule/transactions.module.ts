import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TransactionsRoutingModule } from './transactions-routing.module';
import { SalesOrderComponent } from './sales-order/sales-order.component';
import { SalesComponent } from './sales/sales.component';
import { ReceiptComponent } from './receipt/receipt.component';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    TransactionsRoutingModule,
    SalesOrderComponent,
    SalesComponent,
    ReceiptComponent

  ]
})
export class TransactionsModule { }
 