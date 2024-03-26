import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TransactionPinPage } from './transaction-pin.page';

const routes: Routes = [
  {
    path: '',
    component: TransactionPinPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TransactionPinPageRoutingModule {}
