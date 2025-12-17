import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReceiptAddComponent } from './receipt-add/receipt-add.component';
import { ReceiptModifyComponent } from './receipt-modify/receipt-modify.component';
import { ReceiptListComponent } from './receipt-list/receipt-list.component';

const routes: Routes = [
  {path:"receipt-add",component:ReceiptAddComponent},
  {path:"receipt-modify",component:ReceiptModifyComponent},
  {path:"reciept-list",component:ReceiptListComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReceiptModuleRoutingModule { }
