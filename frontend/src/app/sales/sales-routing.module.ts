import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SalesAddComponent } from './sales-add/sales-add.component';
import { SalesModifyComponent } from './sales-modify/sales-modify.component';
import { SalesListComponent } from './sales-list/sales-list.component';

const routes: Routes = [
  {path:'sales-add',component:SalesAddComponent},
  {path:"sales-modify",component:SalesModifyComponent},
  {path:"sales-list",component:SalesListComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SalesRoutingModule { }
