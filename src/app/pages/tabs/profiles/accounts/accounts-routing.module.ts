import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AccountsPage } from './accounts.page';

const routes: Routes = [
  {
    path: '',
    component: AccountsPage
  },
  {
    path: 'email',
    loadChildren: () => import('./email/email.module').then( m => m.EmailPageModule)
  },
  {
    path: 'tag-name',
    loadChildren: () => import('./tag-name/tag-name.module').then( m => m.TagNamePageModule)
  },
  {
    path: 'verification',
    loadChildren: () => import('./verification/verification.module').then( m => m.VerificationPageModule)
  },
  {
    path: 'sub-accounts',
    loadChildren: () => import('./sub-accounts/sub-accounts.module').then( m => m.SubAccountsPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccountsPageRoutingModule {}
