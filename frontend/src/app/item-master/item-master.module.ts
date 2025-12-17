import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ItemMasterRoutingModule } from './item-master-routing.module';
import { ItemAddComponent } from './item-add/item-add.component';
import { ItemModifyComponent } from './item-modify/item-modify.component';
import { ItemListComponent } from './item-list/item-list.component';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ItemMasterRoutingModule,
    ItemAddComponent,ItemModifyComponent,ItemListComponent
  ]
})
export class ItemMasterModule { }
