import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DepositPageRoutingModule } from './deposit-routing.module';

import { DepositPage } from './deposit.paged';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    DepositPageRoutingModule
  ],
  declarations: [DepositPage]
})
export class DepositPageModule {}




