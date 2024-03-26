import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DepositStatusModalPage } from './deposit-status-modal.page';

const routes: Routes = [
  {
    path: '',
    component: DepositStatusModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DepositStatusModalPageRoutingModule {}
