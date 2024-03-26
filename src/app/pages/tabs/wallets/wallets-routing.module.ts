import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WalletsPage } from './wallets.page';

const routes: Routes = [
  {
    path: '',
    component: WalletsPage
  },
 {
  path: 'profiles',
  loadChildren: () => import('../profiles/profiles.module').then( m => m.ProfilesPageModule)
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
export class WalletsPageRoutingModule {}
