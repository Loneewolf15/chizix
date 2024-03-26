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

interface Window {
  VPayDropin : any
};
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



  
  async  deposit() {
    const loading = await this.loadingCtrl.create({
      message: 'Processing...',
    });
    await loading.present();
    // perform form submission here

    // if(this.validateData() && !this.form.valid){
      if(this.form.valid){
      this.form.markAllAsTouched();
      // return(
      //   this.depositData.email &&
      //   this.depositData.password &&
      //   this.depositData.email.length > 0 &&
      //   this.depositData.password.length > 0
  
      // );
     
      const depositData = {
        amount: this.form.get('amountx').value,
        email: this.form.get('email').value,
        currency: 'NGN',
        domain: 'live',
        key: 'dfaae40b-6457-4c77-932c-6b0ac6733e8a',
        transactionref: '4z31zs098zas8w3774h44344f8yg',
        customer_logo: 'https://www.vpay.africa/static/media/vpayLogo.91e11322.svg',
        customer_service_channel: '+2348030007000, support@org.com',
        txn_charge: 6,
        txn_charge_type: 'flat',
        onSuccess: function (response) {
          console.log('Transaction successful: ', response.message);
        },
        onExit: function (response) {
          console.log('Transaction cancelled: ', response.message);
        },
        
      };

      try {
     
       

      this.authService.deposit(depositData).subscribe(
      async (response) => {
          console.log('Deposit page called!', response);
          eval(response);
          
             // Call OTP page here
            if (response.VPayDropin) {
              const {open, exit} = this.VPayDropin.create(depositData);
              open();                    
          }
            
             console.log('Email:', depositData.email);
         // this.router.navigateByUrl('/otp');
        //  const depositSuccess = true; // Or false if deposit failed
        //  await this.presentDepositModal(depositSuccess);

        if (response.status === 'processing') {
          this.presentDepositAlert('Processing', depositData.amount)
        } else if (response.status === 'success') {
        //  this.presentDepositAlert('Success', depositData.amount);
          this.presentDepositAlertx('successful', depositData.amount, 'Deposit Complete', 'Your funds are now available in your account.');

        } else if (response.status === 'error') {
          this.presentDepositAlert('Error', depositData.amount);
        }
      
         //this.presentDepositAlert('Processing');

         

        },
       async (error) => {
          console.error('Failed to call deposit page!', error);
          this.presentDepositAlertx('Failed', depositData.amount, 'Deposit Failed', 'We could not complete your request, please try again shortly.');

          this.toastService.showToast('Check your internet connection || Network connection failed')
        //  const depositSuccess = false; 
          // Or false if deposit failed
          //await this.presentDepositModal(depositSuccess);
          //this.presentDepositAlert('Error', depositData.amount);
          
        }
      );
      console.log(depositData);

      console.log('I got Here')
    }
    catch (error) {
      console.error('Deposit error:', error);
      this.presentDepositAlert('Error', depositData.amount);
    }
    
    await loading.dismiss();
  
    
  }

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



  


}
