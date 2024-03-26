import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DepositPage } from './deposit.paged';

const routes: Routes = [
  {
    path: '',
    component: DepositPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DepositPageRoutingModule {}
