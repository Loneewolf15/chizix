import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VtuPageRoutingModule } from './vtu-routing.module';

import { VtuPage } from './vtu.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VtuPageRoutingModule
  ],
  declarations: [VtuPage]
})
export class VtuPageModule {}
