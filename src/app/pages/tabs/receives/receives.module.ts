import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReceivesPageRoutingModule } from './receives-routing.module';

import { ReceivesPage } from './receives.page';
import { QRCodeModule } from 'angularx-qrcode';





@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReceivesPageRoutingModule,
    QRCodeModule
  ],
  declarations: [ReceivesPage]
})
export class ReceivesPageModule {}
