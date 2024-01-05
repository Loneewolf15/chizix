import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MtransferPage } from './mtransfer.page';

const routes: Routes = [
  {
    path: '',
    component: MtransferPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MtransferPageRoutingModule {}
