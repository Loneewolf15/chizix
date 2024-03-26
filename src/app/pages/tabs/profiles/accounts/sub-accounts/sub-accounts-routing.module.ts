import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SubAccountsPage } from './sub-accounts.page';

const routes: Routes = [
  {
    path: '',
    component: SubAccountsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SubAccountsPageRoutingModule {}
