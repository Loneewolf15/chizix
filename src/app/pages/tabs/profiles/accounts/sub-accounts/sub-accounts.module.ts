import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SubAccountsPageRoutingModule } from './sub-accounts-routing.module';

import { SubAccountsPage } from './sub-accounts.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SubAccountsPageRoutingModule
  ],
  declarations: [SubAccountsPage]
})
export class SubAccountsPageModule {}
