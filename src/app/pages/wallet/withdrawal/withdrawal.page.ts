import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { PreferencesService } from 'src/app/services/storage.service';
import { ToastService } from 'src/app/services/toast.service';

import { AuthConstants } from 'src/app/config/auth-constants';


@Component({
  selector: 'app-withdrawal',
  templateUrl: './withdrawal.page.html',
  styleUrls: ['./withdrawal.page.scss'],
})

export class WithdrawalPage implements OnInit {
  
    form: FormGroup;
  Withdrawalform: FormGroup;
  type = true;

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
      this.form = new FormGroup({
       
  
        amount: new FormControl(null, {validators: [Validators.required]}),
        accountName: new FormControl(null, {validators: [Validators.required]}),
        bankName: new FormControl(null, {validators: [Validators.required]}),
       
        accountNumber: new FormControl(null, {validators: [Validators.required, Validators.minLength(10), Validators.maxLength(10)]}),
        
  
        description: new FormControl(null, {validators: [Validators.required]})

      });
    }


    
  ngOnInit() {
    
   
  }

    initForm() {
      

    }



async presentToast(message: string) {
  const toast = await this.toastController.create({
    message: message,
    duration: 2000,
    position: 'top'
  });
  toast.present();
}

 async submti() {
  const loading = await this.loadingController.create({
    message: 'Please wait...',
  });
  await loading.present();
  // perform form submission here

  if (this.form.valid) {
    const formData = {
      amount: this.form.get('amount').value,
      bankName: this.form.get('bankName').value,
      accountName: this.form.get('accountName').value,
      accountNumber: this.form.get('accountNumber').value,
      descripton: this.form.get('descripton').value,
      
    };

   

    this.authService.register(formData).subscribe(
      (response) => {
        console.log('Registration successful!', response);
           // Call OTP page here
          // this.showOtpForm = true;
           console.log('Email:', formData.amount);
       // this.router.navigateByUrl('/otp');


      },
      (error) => {
        console.error('Registration failed!', error);
       // this.showOtpForm = true;
        this.toastService.showToast('Check your internet connection || Network connection failed')
      }
    );
    console.log(formData);

    console.log('I got Here')
  }
  
  await loading.dismiss();

  
}

async onSubmitx() {

   // Create confirmation modal
   const modal = await this.modalController.create({
    component: '',
    cssClass: 'my-custom-class',
    componentProps: {
      amount: this.form.get('amount'),
      bankName: this.form.get('bankName'),
      accountNumber: this.form.get('accountNumber'),
      accountHolderName: this.form.get('accountName'),
      withdrawalReason: this.form.get('description')
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
