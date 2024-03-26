import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReceivesPage } from './receives.page';

const routes: Routes = [
  {
    path: '',
    component: ReceivesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReceivesPageRoutingModule {}
