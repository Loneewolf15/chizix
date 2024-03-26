import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MtransferPageRoutingModule } from './mtransfer-routing.module';

import { MtransferPage } from './mtransfer.page';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    MtransferPageRoutingModule
  ],
  declarations: [MtransferPage]
})
export class MtransferPageModule {}




