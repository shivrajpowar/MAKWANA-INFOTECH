import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdministrationRoutingModule } from './administration-routing.module';
import { AccountMasterComponent } from './account-master/account-master.component';
import { ItemMasterComponent } from './item-master/item-master.component';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AdministrationRoutingModule,
    AccountMasterComponent,
    ItemMasterComponent
  ]
})
export class AdministrationModule { }
