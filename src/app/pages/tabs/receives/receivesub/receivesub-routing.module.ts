import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReceivesubPage } from './receivesub.page';

const routes: Routes = [
  {
    path: '',
    component: ReceivesubPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReceivesubPageRoutingModule {}
