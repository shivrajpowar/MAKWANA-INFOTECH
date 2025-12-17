import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SalesOrderAddComponent } from './sales-order-add/sales-order-add.component';
import { SalesOrderModifyComponent } from './sales-order-modify/sales-order-modify.component';
import { SalesOrderListComponent } from './sales-order-list/sales-order-list.component';

const routes: Routes = [
  {path:"salesOrder-add",component:SalesOrderAddComponent},
  {path:"salesOrder-modify",component:SalesOrderModifyComponent},
  {path:"salesOrder-list",component:SalesOrderListComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SalesOrderRoutingModule { }
