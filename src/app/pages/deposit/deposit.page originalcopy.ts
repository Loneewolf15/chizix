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



@Component({
  selector: 'app-deposit',
  templateUrl: './deposit.page.html',
  styleUrls: ['./deposit.page.scss'],
})


export class DepositPage implements OnInit {

  

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
    

      //amount: new FormControl(null, {validators: [Validators.required]}),
      
      email: new FormControl(null, {validators: [Validators.required, Validators.email]}),
     amount: new FormControl(null, {validators: [Validators.required, Validators.minLength(2)]})

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
  

  async presentDepositStatusModal(status: string) {
    const modal = await this.modalCtrl.create({
      component: DepositStatusModalPage,
      componentProps: {
        status: status
      }
    });

    return await modal.present();
  }


  async  depositx() {
    const loading = await this.loadingCtrl.create({
      message: 'Please wait...',
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
     
      const formData = {
        amount: this.form.get('amount').value,
        email: this.form.get('email').value,
       
      };

     

      this.authService.deposit(formData).subscribe(
      async (response) => {
          console.log('Deposit page called!', response);
             // Call OTP page here
        
             console.log('Email:', formData.email);
         // this.router.navigateByUrl('/otp');
         const depositSuccess = true; // Or false if deposit failed
         await this.presentDepositModal(depositSuccess);
        
        // const depositStatus = await performDeposit();

        // // update modal state based on deposit status
        // switch (depositStatus) {
        //   case 'Pending':
        //     this.depositState = 'Pending';
        //     break;
        //   case 'Processing':
        //     this.depositState = 'Processing';
        //     break;
        //   case 'Completed':
        //     this.depositState = 'Completed';
        //     break;
        //   case 'Failed':
        //     this.depositState = 'Failed';
        //     break;
        //   default:
        //     break;
      



        },
       async (error) => {
          console.error('Failed to call deposit page!', error);
       
          this.toastService.showToast('Check your internet connection || Network connection failed')
          const depositSuccess = false; 
          // Or false if deposit failed
          await this.presentDepositModal(depositSuccess);
        }
      );
      console.log(formData);

      console.log('I got Here')
    }
    
    await loading.dismiss();
  
    
  }


  
  async  deposit() {
    const loading = await this.loadingCtrl.create({
      message: 'Please wait...',
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
     
      const formData = {
        amount: this.form.get('amount').value,
        email: this.form.get('email').value,
       
      };

     

      this.authService.deposit(formData).subscribe(
      async (response) => {
          console.log('Deposit page called!', response);
             // Call OTP page here
        
             console.log('Email:', formData.email);
         // this.router.navigateByUrl('/otp');
         const depositSuccess = true; // Or false if deposit failed
         await this.presentDepositModal(depositSuccess);
this.presentDepositStatusModal('Processing');

        },
       async (error) => {
          console.error('Failed to call deposit page!', error);
       
          this.toastService.showToast('Check your internet connection || Network connection failed')
          const depositSuccess = false; 
          // Or false if deposit failed
          await this.presentDepositModal(depositSuccess);
        }
      );
      console.log(formData);

      console.log('I got Here')
    }
    
    await loading.dismiss();
  
    
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


  onVerifyOTP() {
    this.showLoader('Verifying...');
    if (this.otpForm.valid) {
      const data = { ...this.form.value, ...this.otpForm.value };
      this.authService.verifyOTP(data).subscribe(
       async (response) => {
          console.log(response);
if(data.status === 'Account successfully activated'){
  const toast = await this.toastCtrl.create({
    message: 'OTP verified successfully.',
    duration: 3000,
    position: 'bottom'
  });
  toast.present();
  this.router.navigateByUrl('/tabs')
}
          this.hideLoader();
      this.modalCtrl.dismiss(data);
      this.toastService.showToast(data.status);

        },
      async (error) => {
          console.log(error);
          const toast = await this.toastCtrl.create({
            message: 'Invalid OTP. Please try again.',
            duration: 3000,
            position: 'middle',
            color: 'warning'
          });
          toast.present();
        }
      );
    }
  }


  resendOTP() {
    console.log('Resending OTP to:', this.form.get('email').value);
    // TODO: Resend OTP to the email address
    this.startResendTimer();
  }
  

  startResendTimer() {
    this.resendDisabled = true;
    this.resendSubscription = interval(1000).subscribe(() => {
      this.resendTime--;
      if (this.resendTime === 0) {
        this.resendSubscription.unsubscribe();
        this.resendDisabled = false;
        this.resendTime = 30;
      }
    });
  }

  


}
