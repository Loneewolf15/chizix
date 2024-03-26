import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WithdrawalPageRoutingModule } from './withdrawal-routing.module';

import { WithdrawalPage } from './withdrawal.page';
//import { OtpComponent } from './otp/otp.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    WithdrawalPageRoutingModule
  ],
  declarations: [WithdrawalPage]
})
export class WithdrawalPageModule {}




