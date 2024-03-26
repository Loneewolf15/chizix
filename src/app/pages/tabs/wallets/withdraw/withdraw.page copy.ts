import { Component } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-withdraw',
  templateUrl: './withdraw.page.html',
  styleUrls: ['./withdraw.page.scss'],
})
export class WithdrawPage {
  amount: number;
  bankName: string;
  accountNumber: number;
  accountHolderName: string;
  withdrawalReason: string;

  constructor(public toastController: ToastController,
    public loadingController: LoadingController,
    public modalController: ModalController) {}


async presentToast(message: string) {
  const toast = await this.toastController.create({
    message: message,
    duration: 2000,
    position: 'top'
  });
  toast.present();
}



async onSubmit() {

   // Create confirmation modal
   const modal = await this.modalController.create({
    component: '',
    cssClass: 'my-custom-class',
    componentProps: {
      amount: this.amount,
      bankName: this.bankName,
      accountNumber: this.accountNumber,
      accountHolderName: this.accountHolderName,
      withdrawalReason: this.withdrawalReason
    }
  });

  // Display success or error message
  this.presentToast('Withdrawal request submitted successfully.');

  // Display loading spinner
  const loading = await this.loadingController.create({
    message: 'Please wait...',
  });
  await loading.present();

  //Logic to Handle the form submission here
    // Display confirmation modal
    await modal.present();

    // Handle confirmation response from user
    const { data } = await modal.onDidDismiss();
    if (data && data.confirmed) {
      // Logic to Submit the form here
    }
  // Hide loading spinner
  await loading.dismiss();
}

}
