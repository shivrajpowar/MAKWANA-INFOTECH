import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ItemAddComponent } from './item-add/item-add.component';
import { ItemModifyComponent } from './item-modify/item-modify.component';
import { ItemListComponent } from './item-list/item-list.component';

const routes: Routes = [
  {path:"Item-add",component:ItemAddComponent},
  {path:"Item-modify",component:ItemModifyComponent},
  {path:"Item-list", component:ItemListComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ItemMasterRoutingModule { }
