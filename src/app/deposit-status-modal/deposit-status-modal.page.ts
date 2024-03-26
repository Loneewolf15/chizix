import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-deposit-status-modal',
  templateUrl: './deposit-status-modal.page.html',
  styleUrls: ['./deposit-status-modal.page.scss'],
})
export class DepositStatusModalPage implements OnInit {
  status: string;

  constructor(
    private modalController: ModalController,
    private navParams: NavParams
  ) {}

  ngOnInit() {
    this.status = this.navParams.get('status');
  }

  dismiss() {
    this.modalController.dismiss();
  }
}

