import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TagNamePage } from './tag-name.page';

const routes: Routes = [
  {
    path: '',
    component: TagNamePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TagNamePageRoutingModule {}
