import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SalesOrderComponent } from './sales-order/sales-order.component';
import { SalesComponent } from './sales/sales.component';
import { ReceiptComponent } from './receipt/receipt.component';

const routes: Routes = [
  {path:"sales-order",
    component:SalesOrderComponent
  },
  {
   path: 'sales',
    component:SalesComponent 
  },
  {
  path: 'receipt',
   component:ReceiptComponent
  }
,
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TransactionsRoutingModule { }
