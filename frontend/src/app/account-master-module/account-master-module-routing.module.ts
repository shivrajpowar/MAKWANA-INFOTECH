import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountAddComponent } from './account-add/account-add.component';
import { AccountModifyComponent } from './account-modify/account-modify.component';
import { AccountListComponent } from './account-list/account-list.component';

const routes: Routes = [
  {path:"Acc-add",component:AccountAddComponent},
  {path:"Acc-modify",component:AccountModifyComponent},
  {path:"Acc-list",component:AccountListComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountMasterModuleRoutingModule { }
