import { NgModule } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DepositStatusModalPageRoutingModule } from './deposit-status-modal-routing.module';

import { DepositStatusModalPage } from './deposit-status-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CurrencyPipe,
    DepositStatusModalPageRoutingModule
  ],
  declarations: [DepositStatusModalPage]
})
export class DepositStatusModalPageModule {}
