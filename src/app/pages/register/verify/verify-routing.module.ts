import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VerifyPage } from './verify.page';

const routes: Routes = [
  {
    path: '',
    component: VerifyPage
  },
  
  // {
  //   path: 'withdraw',
  //   loadChildren: () => import('./withdraw/withdraw.module').then( m => m.WithdrawPageModule)
  // }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VerifyPageRoutingModule {}
