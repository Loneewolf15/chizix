import { AlertController, AnimationController, ModalController } from '@ionic/angular';
import { Component, Input, OnInit } from '@angular/core';
import { Clipboard } from '@capacitor/clipboard';
import { ImageService } from 'src/app/services/image.service';
import { TransactionStatusComponent } from 'src/app/transaction-status/transaction-status.component';

@Component({
  selector: 'app-example',
  templateUrl: './example.page.html',
  styleUrls: ['./example.page.scss'],
})
export class ExamplePage implements OnInit {
  @Input() header: string;
  @Input() status: string;
  @Input() amount: any;
  @Input() message: string;

  constructor(
    public alertController: AlertController,
    private modalController: ModalController,
    private animationCtrl: AnimationController
  ) {}

  ngOnInit() {}

  async presentModal(status: string, amount: any, title?: string, subtitle?: string) {
    let message: string;
    let imgSrc: string;
    let subHeader : string;

    switch (status) {
      case 'successful':
        message = `You have successfully sent ${amount} into Velux user @Divine wallet.`;
        subHeader = 'Transaction SuccessFul'
        imgSrc = 'assets/imgs/success.png';
        break;
      case 'insufficient fund':
        message = `Your request to send ${amount} to @Divine could not be completed due to insufficient funds in your account.`;
        imgSrc = 'assets/imgs/received.png';
        break;
      case 'failed':
        message = 'Please enter an amount greater than ₦50.';
        imgSrc = '';
        break;
      default:
        message = 'An unknown error occurred!!<br>Please try again later';
        imgSrc = 'assets/imgs/sent.png';
        break;
    }

    this.header = title || 'Transaction Status';
    this.status = status || 'Unknown';
    this.amount = amount || '50';
    this.message = message;

    const modal = await this.modalController.create({
      component: TransactionStatusComponent,
      componentProps: {
        header: this.header,
        status: this.status,
        amount: this.amount,
        message: this.message,
        imgSrc: imgSrc
      },
      cssClass: 'transaction-modal',
    });

    await modal.present();
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Alert Header',
      message: 'Alert Message',
      buttons: ['OK']
    });

    await alert.present();
  }

  ////////////////////Animation was done here//////////////////////////

  enterAnimation = (baseEl: HTMLElement) => {
    const backdropAnimation = this.animationCtrl
      .create()
      .addElement(baseEl.querySelector('ion-backdrop')!)
      .fromTo('opacity', '0', '0');

    const wrapperAnimation = this.animationCtrl
      .create()
      .addElement(baseEl.querySelector('.modal-wrapper')!)
      .keyframes([
        { offset: 0, opacity: '0', transform: 'scale(0)' },
        { offset: 1, opacity: '1', transform: 'scale(1)' },
      ]);

    return this.animationCtrl
      .create()
      .addElement(baseEl)
      .easing('ease-out')
      .duration(500)
      .addAnimation([backdropAnimation, wrapperAnimation]);
  };

  leaveAnimation = (baseEl: HTMLElement) => {
    return this.enterAnimation(baseEl).direction('reverse');
  };

  ////////////////////Animation ends here//////////////////////////
}
