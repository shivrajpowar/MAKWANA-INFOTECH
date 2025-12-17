import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReceiptModuleRoutingModule } from './receipt-module-routing.module';
import { ReceiptAddComponent } from './receipt-add/receipt-add.component';
import { ReceiptModifyComponent } from './receipt-modify/receipt-modify.component';
import { ReceiptListComponent } from './receipt-list/receipt-list.component';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ReceiptModuleRoutingModule,
    ReceiptAddComponent,ReceiptModifyComponent,ReceiptListComponent
  ]
})
export class ReceiptModuleModule { }
