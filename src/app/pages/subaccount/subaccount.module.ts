import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SubaccountPageRoutingModule } from './subaccount-routing.module';

import { SubaccountPage } from './subaccount.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SubaccountPageRoutingModule
  ],
  declarations: [SubaccountPage]
})
export class SubaccountPageModule {}
