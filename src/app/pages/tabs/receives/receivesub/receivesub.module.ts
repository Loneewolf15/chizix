import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReceivesubPageRoutingModule } from './receivesub-routing.module';

import { ReceivesubPage } from './receivesub.page';
import { QRCodeModule } from 'angularx-qrcode';





@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReceivesubPageRoutingModule,
    QRCodeModule
  ],
  declarations: [ReceivesubPage]
})
export class ReceivesubPageModule {}
