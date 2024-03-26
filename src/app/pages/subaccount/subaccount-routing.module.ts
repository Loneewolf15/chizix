import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SubaccountPage } from './subaccount.page';

const routes: Routes = [
  {
    path: '',
    component: SubaccountPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SubaccountPageRoutingModule {}
