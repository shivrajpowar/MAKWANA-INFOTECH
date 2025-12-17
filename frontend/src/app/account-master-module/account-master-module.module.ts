import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountMasterModuleRoutingModule } from './account-master-module-routing.module';
import { AccountAddComponent } from './account-add/account-add.component';
import { AccountModifyComponent } from './account-modify/account-modify.component';
import { AccountListComponent } from './account-list/account-list.component';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AccountMasterModuleRoutingModule,
    AccountAddComponent,AccountModifyComponent,AccountListComponent
  ]
})
export class AccountMasterModuleModule { }
