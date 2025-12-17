import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SalesRoutingModule } from './sales-routing.module';
import { SalesAddComponent } from './sales-add/sales-add.component';
import { SalesModifyComponent } from './sales-modify/sales-modify.component';
import { SalesListComponent } from './sales-list/sales-list.component';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SalesRoutingModule,
    SalesAddComponent,SalesModifyComponent,SalesListComponent
  ]
})
export class SalesModule { }
