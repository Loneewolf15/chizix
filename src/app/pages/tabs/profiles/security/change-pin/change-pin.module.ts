import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChangePinPageRoutingModule } from './change-pin-routing.module';

import { ChangePinPage } from './change-pin.page';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    ChangePinPageRoutingModule
  ],
  declarations: [ChangePinPage]
})
export class ChangePinPageModule {}




