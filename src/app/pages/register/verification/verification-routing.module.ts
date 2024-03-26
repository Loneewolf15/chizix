import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VerificationPage } from './verification.page';

const routes: Routes = [
  {
    path: '',
    component: VerificationPage
  },
  {
    path: 'scan',
    loadChildren: () => import('./scan/scan.module').then( m => m.ScanPageModule)
  },
  {
    path: 'selfie',
    loadChildren: () => import('./selfie/selfie.module').then( m => m.SelfiePageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VerificationPageRoutingModule {}
