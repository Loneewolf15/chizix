import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
//import { AuthScreenGuard } from 'src/app/guards/auth-screen.guard';

import { AuthScreenPage } from './auth-screen.page';

const routes: Routes = [
  {
    path: '',
    component: AuthScreenPage,
  // canActivate: [AuthScreenGuard],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthScreenPageRoutingModule {}
