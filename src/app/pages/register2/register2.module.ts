import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegisterPage2RoutingModule } from './register2-routing.module';

import { RegisterPage2 } from './register2.page';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    RegisterPage2RoutingModule
  ],
  declarations: [RegisterPage2]
})
export class RegisterPage2Module {}




