import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BatPageRoutingModule } from './bat-routing.module';

import { BatPage } from './bat.page';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    BatPageRoutingModule
  ],
  declarations: [BatPage]
})
export class BatPageModule {}




