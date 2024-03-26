import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TransactionPinPageRoutingModule } from './transaction-pin-routing.module';

import { TransactionPinPage } from './transaction-pin.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TransactionPinPageRoutingModule
  ],
  declarations: [TransactionPinPage]
})
export class TransactionPinPageModule {}
