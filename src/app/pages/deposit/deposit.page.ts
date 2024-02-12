import { Component, NO_ERRORS_SCHEMA, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { PreferencesService } from 'src/app/services/storage.service';
import { ToastService } from 'src/app/services/toast.service';
import { Router } from '@angular/router';
import { IonicModule, ModalController, ToastController } from '@ionic/angular';
import { AuthConstants } from 'src/app/config/auth-constants';
import { LoadingController } from '@ionic/angular';
import { interval, Subscription } from 'rxjs';
// import { DepositModalComponent } from 'src/app/deposit-modal/deposit-modal.component';
// import { DepositStatusModalPage } from 'src/app/deposit-status-modal/deposit-status-modal.page';

import { AlertController } from '@ionic/angular';
import { TransactionStatusComponent } from 'src/app/transaction-status/transaction-status.component';
import { CommonModule } from '@angular/common';

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
  standalone:true,
  imports:[
   
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,],
    schemas:[NO_ERRORS_SCHEMA]
  
})


export class DepositPage implements OnInit {
  userData: any;
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
vpay: any;
  public depositData = {
    amount: '',
    tagname: '',
    phone: '',
    password: '',
    email: '',
    confirmPassword: '',
  
  }
  selectedTag: any;
  header: string;
  status: string;
  amount: any;
  message: string;

  constructor(
    //  private registrationService: RegistrationService,
    private loadingCtrl: LoadingController,
    private formBuilder: FormBuilder,
    private router: Router,
    private loadingCtl: LoadingController,
    private modalCtrl: ModalController,
    private alertController: AlertController,
    private toastCtrl: ToastController,
    private storage: PreferencesService,
    private authService: AuthService,
    private toastService: ToastService,
    private toastController: ToastController,
  ) {
    this.initForm();
  }
 
  


  ngOnInit() {
    //timer to resend OTP starter
    const userDataString = localStorage.getItem('userData');
    if (userDataString) {
      this.userData = JSON.parse(userDataString);
    }

  }

  initForm() {
    this.form = new FormGroup({
      

   
      // tagname: new FormControl(null, {validators: [Validators.required]}),
      //email: new FormControl(null, {validators: [Validators.required, Validators.email]}),
     amountx: new FormControl(null, {validators: [Validators.required, Validators.min(100)]})
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



  


  async presentDepositAlert(status: string, amount: any, title?: string, subtitle?: string) {
    let message: string;
    let imgSrc: string;
    
  
    switch (status) {
      case 'transaction successful':
        message = `Your deposit of ₦${amount} into your Velux wallet was ${status}`;
        
        imgSrc = 'assets/imgs/success.png';
        break;
      case 'User exited the flow':
        message = `Your deposit of ₦${amount} failed. Please try again later.`;
        imgSrc = 'assets/imgs/failed.png';
        break;
      case 'failed':
        message = 'Sorry!! <br> We could not complete your request at this time, Please try again sooner.';
        imgSrc = 'assets/imgs/less.png';
        break;
      default:
        message = 'An unknown error occurred!!<br>Please try again later';
        imgSrc = 'assets/imgs/less.png';
        break;
    }
  
    this.header = title || 'Deposit Status';
    this.status = status || 'Unknown';
    this.amount = amount || '50';
    this.message = message;
    
  
    const modal = await this.modalCtrl.create({
      component: TransactionStatusComponent,
      componentProps: {
        header: this.header,
        status: this.status,
        amount: this.amount,
        message: this.message,
        imgSrc: imgSrc,
        subHeader: subtitle,
      },
      cssClass: 'transaction-modal',
    });
  
    await modal.present();
  }


  customCounterFormatterE(inputLength: number, maxLength: number) {
    return `${maxLength - inputLength} characters remaining`;
  }

    // Method to check if the entered value is less than 100 naira
    checkAmount() {
      const amountControl = this.form.get('amountx');
  
      if (amountControl && amountControl.value < 100) {
        amountControl.setErrors({ 'invalidAmount': true });
      } else {
        amountControl.setErrors(null);
      }
    }
  

  
  showLoader(msg) {
    if (!this.isLoading) {
      this.isLoading = true;
      return this.loadingCtrl.create({
        message: msg
      }).then((res) => {
        res.present();
        res.onDidDismiss().then((dis) => {
          this.isLoading = false;
        });
      });
    }
    return true;
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
    for (let i = 0; i < 22; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }
  
  async presentToast(message, color){
    const toast = await this.toastCtrl.create({
    message : message,
    color: color,
    duration: 1000,
    position: "bottom",
    
    });
    toast.present();
    }

    async presentLoading( message: string, spinnerx: any){
      const loading = await this.loadingCtl.create({
        message: message,
        spinner: spinnerx
      });
      await loading.present();
    }
  

  async deposit() {
    const loading = await this.loadingCtrl.create({
      message: 'Processing...',
    });
    await loading.present();

    if(this.form.valid){
    this.amounted = this.form.get('amountx').value

this.feex = this.amounted * 0.02
if(this.feex >= 2050){
  this.feex = 2050
}  

//this.amounted += this.feex;
console.log(this.amounted)
this.amounted = parseFloat(this.amounted);
this.feex = parseFloat(this.feex);
const totalAmount = parseFloat(this.amounted) + parseFloat(this.feex)
this.amounted = totalAmount
this.vpay = totalAmount * 0.013;
if(this.vpay >= 2000){
this.vpay = 2000
}
console.log(totalAmount + 'Divine');
this.transactionRef = "Velux-" + this.generateTransactionRef();
console.log(this.transactionRef)

    const options = {
      amount: this.amounted,
        email: this.userData?.loginData.email,
      currency: 'NGN',
      domain: 'live',
      key: '0277f435-be59-48c5-bee9-6ed59375e2d5',
      transactionref: this.transactionRef,
      customer_logo:
        'https://www.vpay.africa/static/media/vpayLogo.91e11322.svg',
      customer_service_channel: '+2347044235654, info@veluxpay.com',
      txn_charge: 0.5,
      txn_charge_type: 'flat',
      onSuccess: (response: any) => {
        console.log('Hello World!', response.message);
        console.log(options);
      
        // implement logic to send response to the backend API here
        const backendInfo = {
          amount: options.amount - parseFloat(this.feex),
          transactionref: options.transactionref,
        };
        console.log(backendInfo);

        this.authService.depoxit(backendInfo).subscribe(
          (response) => {
            console.log('this', response);
           if(response.message === 'transaction successful'){

            this.presentDepositAlert(
              response.message,
              options.amount - parseFloat(this.feex),
              'Deposit Successful',
             
            );

           } else{
            alert(response.mesage)
           }
  
          },
          (error) => {
            console.error('Registration failed!', error);
            // this.showOtpForm = true;
            //this.toastService.showToast('Check your internet connection || Network connection failed')
          }
        );
      },
      onExit: async (response: any) => {
        
        console.log('Hello World!', response.message);
        console.log(options);
        // window.location.href = '/tabs/home';
        //alert('Deposit Failed');
        const backendInfo = {
          amount: options.amount - parseFloat(this.feex),
          transactionref: options.transactionref,
        };
        console.log(backendInfo);

            if(response.message === 'User exited the flow' && response.message){

            this.presentDepositAlert(
              response.message,
              options.amount - parseFloat(this.feex),
              'Incomplete Request',
            );

           } else{
            alert(response.mesage)
           }

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