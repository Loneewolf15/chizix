import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { PreferencesService } from 'src/app/services/storage.service';
import { ToastService } from 'src/app/services/toast.service';
import { Router } from '@angular/router';
import { ModalController, ToastController } from '@ionic/angular';
import { AuthConstants } from 'src/app/config/auth-constants';

//import { OtpComponent } from './otp/otp.component';
import { LoadingController } from '@ionic/angular';
import { interval, Subscription } from 'rxjs';
import { DepositModalComponent } from 'src/app/deposit-modal/deposit-modal.component';
import { DepositStatusModalPage } from 'src/app/deposit-status-modal/deposit-status-modal.page';

import { AlertController } from '@ionic/angular';

declare global {
  interface Window {
    VPayDropin: any;
  }
}

declare const VPayDropin: any;

@Component({
  selector: 'app-deposit',
  templateUrl: './deposit.page.html',
  styleUrls: ['./deposit.page.scss'],
  
})


export class DepositPage implements OnInit {

  
  VPayDropin : any;
  otpSubscription: Subscription;
  otpTime: number = 60; // seconds
  otpDisabled: boolean = false;
resendSubscription: Subscription;
resendTime: number = 30; // seconds
resendDisabled: boolean = false;
  form: FormGroup;
  isLoading = false;
  type = true;
  verified = false;
  verifiedNumber: any;
  verifiedEmail: boolean;
  showSpinner = false;
  otpForm: FormGroup;
  showOtpForm = false;
  transactionRef: string="";
feex : any;
amounted: any;
  public depositData = {
    amount: '',
    tagname: '',
    phone: '',
    password: '',
    email: '',
    confirmPassword: '',
  
  }

  constructor(
    //  private registrationService: RegistrationService,
    private loadingCtrl: LoadingController,
    private formBuilder: FormBuilder,
    private router: Router,
    private modalCtrl: ModalController,
    private alertController: AlertController,
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
      

   
      // tagname: new FormControl(null, {validators: [Validators.required]}),
      email: new FormControl(null, {validators: [Validators.required, Validators.email]}),
     amountx: new FormControl(null, {validators: [Validators.required, Validators.minLength(3)]})
    });

    
    

    
  }







  changeType() {
    this.type = !this.type;
  }

 


  

  validateData(){
    let email = this.depositData.email;
    let amount = this.depositData.amount;

    return(
      this.depositData.email &&
      this.depositData.amount &&
      email.length > 0 &&
      amount.length > 0

    );
  }



  
  async presentDepositModal(depositSuccess: boolean) {
    const modal = await this.modalCtrl.create({
      component: DepositModalComponent,
      componentProps: {
        depositSuccess: depositSuccess,
      },
    });
    await modal.present();
  }


  async presentDepositModalx() {
    const modal = await this.modalCtrl.create({
      component: DepositModalComponent,
    });
    return await modal.present();
  }

  async presentDepositAlert(status: string, amount: number ) {
    const alert = await this.alertController.create({
      header: 'Deposit Status',
      message: `Your deposit was ${status} and an amount of ${amount} has been added to your account`,
      buttons: ['OK']
    });

    await alert.present();
  }
  

  async presentDepositAlertx(status: string,  amount: number, title?: string, subtitle?: string) {

    let message: string;
    switch (status) {
      case 'successful':
        message = `Your deposit of ${amount} into your Velux wallet was ${status} `;
        break;
      case 'pending':
        message = `Your deposit of ${amount} is currently pending approval.`;
        break;
      case 'failed':
        message = `Your deposit of ${amount} failed. Please try again later.`;
        break;
      default:
        message = 'An unknown error occurred.';
        break;
    }

    const alert = await this.alertController.create({
      header: title || 'Deposit Status',
      subHeader: subtitle,
      message: message,
      buttons: ['Done'],
      backdropDismiss: false,
      cssClass: 'deposit-alert',
      animated: true,
      mode: 'ios',
      //translucent: true,
      // Add the image to the alert
      inputs: [
        {
          type: 'image',
          src: status === 'successful' ? 'assets/imgs/received.png' : 'assets/imgs/sent.png'
        }
      ]
    });
    await alert.present();
  }

  async presentDepositStatusModal(status: string, amount: number ) {
    const modal = await this.modalCtrl.create({
      component: DepositStatusModalPage,
      componentProps: {
        status, amount 
      }
    });

    return await modal.present();
  }



  
 
  showLoader(msg) {
    if(!this.isLoading) this.isLoading = true;
    return this.loadingCtrl.create({
      message: msg,
      spinner: 'bubbles'
    }).then(res => {
      res.present().then(() => {
        if(!this.isLoading) {
          res.dismiss().then(() => {
            console.log('abort presenting');
          });
        }
      })
    })
    .catch(e => {
      this.isLoading = false;
      console.log(e);
    })
  }

  hideLoader() {
    if(this.isLoading) this.isLoading = false;
    return this.loadingCtrl.dismiss()
    .then(() => console.log('dismissed'))
    .catch(e => console.log(e));
  }

   generateTransactionRef() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < 28; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }
  
   // this.transactionRef = this.generateTransactionRef();

  
   
   //fee: this.form.get('amountx').value * 0.016
 
   //const fee = this.amount * 0.016;
  
  async deposit() {
    const loading = await this.loadingCtrl.create({
      message: 'Processing...',
    });
    await loading.present();

    if(this.form.valid){
    this.amounted = this.form.get('amountx').value
    // const fee = this.form.get('amountx').value * 0.016;
    // console.log(fee)
    // console.log(this.transactionRef)
    // console.log(this.form.get('amountx').value + fee)
    //let amounted = this.form.get('amountx').value;

//     let feex = this.form.get('amountx').value * 0.016;
// if (feex > 600) {
//   feex = 600;
// }
// console.log(feex);
// console.log("Hello I am here with"+ this.amounted + feex )

this.feex = this.amounted * 0.016
if(this.feex >= 600){
  this.feex = 600
}  
//this.amounted += this.feex;
console.log(this.amounted)
const totalAmount = parseFloat(this.amounted) + parseFloat(this.feex)
this.amounted = totalAmount
console.log(totalAmount + 'Divine');
this.transactionRef = this.generateTransactionRef();
console.log(this.transactionRef)
    const options = {
      amount: this.amounted,
        email: this.form.get('email').value,
      currency: 'NGN',
      domain: 'live',
      key: '0277f435-be59-48c5-bee9-6ed59375e2d5',
      transactionref: this.transactionRef,
      customer_logo:
        'https://www.vpay.africa/static/media/vpayLogo.91e11322.svg',
      customer_service_channel: '+2348030007000, support@org.com',
      txn_charge: 6,
      txn_charge_type: 'flat',
      onSuccess: function(response) {
        console.log('Hello World!', response.message);
        console.log(options)
        this.presentDepositAlertx('successful', options.amount, 'Deposit Complete', 'Your funds are now available in your account.');
        //implement logic to send response to the backend API here
const backendInfo = {
  amount: options.amount,
  email: options.email
}

        ////////////////////////////////////////////////
      },
      onExit: function(response) {
        console.log('Hello World!', response.message);
        console.log(options)
        this.presentDepositAlertx('Failed', options.amount, 'Deposit Failed', response.message);
        this.toastService.showToast('Payment cancelled by user')
      },
    };

    if (window.VPayDropin) {
      const { open, exit } = VPayDropin.create(options);
      open();
    }
  }

  await loading.dismiss();
  
  }
  


}
