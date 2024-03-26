import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { PreferencesService } from 'src/app/services/storage.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-withdraw',
  templateUrl: './withdraw.page.html',
  styleUrls: ['./withdraw.page.scss'],
})

export class WithdrawPage implements OnInit {
  amount: number;
  bankName: string;
  accountNumber: number;
  form: FormGroup;
  accountHolderName: string;
  withdrawalReason: string;
  Withdrawalform: FormGroup;
  

  constructor(
    public toastController: ToastController,
    public loadingController: LoadingController,
    private formBuilder: FormBuilder,
    public modalController: ModalController,
    private router: Router,
    private modalCtrl: ModalController,
    private toastCtrl: ToastController,
    private storage: PreferencesService,
    private authService: AuthService,
    private toastService: ToastService,
    ) {
      this.initForm();
    }


    
  ngOnInit() {
    //timer to resend OTP starter
   
  }

    initForm() {
      this.form = new FormGroup({
       
  
        amount: new FormControl(null, {validators: [Validators.required]}),
        accountName: new FormControl(null, {validators: [Validators.required]}),
        bankName: new FormControl(null, {validators: [Validators.required]}),
       
        accountNumber: new FormControl(null, {validators: [Validators.required, Validators.minLength(10), Validators.maxLength(10)]}),
        
  
        description: new FormControl(null, {validators: [Validators.required]})
      });

    }



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
