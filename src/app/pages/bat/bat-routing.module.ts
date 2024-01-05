import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BatPage } from './bat.page';

const routes: Routes = [
  {
    path: '',
    component: BatPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BatPageRoutingModule {}
