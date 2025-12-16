import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountMasterComponent } from './account-master/account-master.component';
import { ItemMasterComponent } from './item-master/item-master.component';

const routes: Routes = [
  {
    path: 'account-master',
    component: AccountMasterComponent
  },
  {
   path: 'item-master',
   component:ItemMasterComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministrationRoutingModule { }
