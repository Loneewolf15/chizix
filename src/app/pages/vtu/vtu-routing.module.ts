import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VtuPage } from './vtu.page';

const routes: Routes = [
  {
    path: '',
    component: VtuPage
  },
  {
    path: 'airtime',
    loadChildren: () => import('./airtime/airtime.module').then( m => m.AirtimePageModule)
  },
  {
    path: 'data',
    loadChildren: () => import('./data/data.module').then( m => m.DataPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VtuPageRoutingModule {}
