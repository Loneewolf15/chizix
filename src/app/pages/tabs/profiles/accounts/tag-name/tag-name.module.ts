import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TagNamePageRoutingModule } from './tag-name-routing.module';

import { TagNamePage } from './tag-name.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TagNamePageRoutingModule
  ],
  declarations: [TagNamePage]
})
export class TagNamePageModule {}
