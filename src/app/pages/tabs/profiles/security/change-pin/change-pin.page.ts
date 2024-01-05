import { Component, NO_ERRORS_SCHEMA, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { PreferencesService } from 'src/app/services/storage.service';
import { ToastService } from 'src/app/services/toast.service';
import { Router } from '@angular/router';
import { AlertController, IonicModule, ModalController, ToastController } from '@ionic/angular';
import { AuthConstants } from 'src/app/config/auth-constants';

import { LoadingController } from '@ionic/angular';
import { interval, Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-change-pin',
  templateUrl: './change-pin.page.html',
  styleUrls: ['./change-pin.page.scss'],
  standalone:true,
  imports:[
   
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,],
    schemas:[NO_ERRORS_SCHEMA]
})


export class ChangePinPage implements OnInit {

  


  pin: any;

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

  public postData = {
    fullname: '',
    tagname: '',
    phone: '',
    pin2: '',
    email: '',
    confirmpin2: '',
  
  }

  constructor(
    private loadingCtrl: LoadingController,
    private loadingCtl: LoadingController,
    private router: Router,
    private toastController: ToastController,
    private modalCtrl: ModalController,
    private toastCtrl: ToastController,
    private authService: AuthService,
    private alertController: AlertController,
    
  ) {
    this.initForm();
  }

  matchValues(pin2: string, confirm_pin2: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls['pin2'];
      const matchingControl = formGroup.controls['confirm_pin2'];
  
      if (matchingControl.errors && !matchingControl.errors['mustMatch']) {
        // another validator has already found an error on the matching control
        return null;
      }
  
      // set error on matching control if validation fails
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ mustMatch: true });
      } else {
        matchingControl.setErrors(null);
      }
    }
  }

//start OTP timer toresend OTP to mail

startOTPTimer() {
  this.otpDisabled = true;
  this.otpSubscription = interval(1000).subscribe(() => {
    this.otpTime--;
    if (this.otpTime === 0) {
      this.otpSubscription.unsubscribe();
      this.otpDisabled = false;
      this.otpTime = 60;
      this.resendOTP();
    }
  });
}


  ngOnInit() {
  }

  initForm() {
    this.form = new FormGroup({
      pin: new FormControl(null, {validators: [Validators.required]}),
      confirm_pin2: new FormControl(null, {validators: [Validators.required, this.matchingpin2s.bind(this)]}),

      pin2: new FormControl(null, {validators: [Validators.required, Validators.minLength(4)]})
    });

   
    

    
  }


  matchingpin2s(control: any) {
    if (this.form) {
      if (control.value !== this.form.controls['pin2.value']) {
        return { mismatchedpin2s: true };
      }
    }

    return null;
  }




  goToLogin(){
    this.router.navigateByUrl('/auth-screen')
  }


  changeType() {
    this.type = !this.type;
  }

  async presentAlertx( subtitle?: string, message?: string) {
    const alert = await this.alertController.create({
      header: 'Velux Pay',
      subHeader: subtitle,
      message: message,
      buttons: [{
        text: 'OK',
        cssClass: 'alert-button-confirm',
        handler: () => {
          if (subtitle !== 'Failed') {
            this.router.navigateByUrl('/tabs');
          }
        }
      }],
      backdropDismiss: false,
      cssClass: 'custom-alert',
      animated: true,
      mode: 'ios',
      translucent: true,
        });
    await alert.present();
  }
  

  async presentLoading( message: string, spinnerx: any){
    const loading = await this.loadingCtl.create({
      message: message,
      spinner: spinnerx
    });
    await loading.present();
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

  changeNumber(event) {
    const email = this.form.value.email;
    if(email && email?.valid) {
      if(this.verifiedEmail && email == this.verifiedEmail) {
        this.verified = true;
      } else {
        this.verified = false;
      }
    }
  }


  
  async  changeP() {
    const loading = await this.loadingCtrl.create({
      message: 'Please wait...',
    });
    await loading.present();
    // perform form submission here
    this.presentLoading('Validating...', 'circular')
    if (this.form.valid) {
      const formData = {
        // fullname: this.form.get('fullname').value,
        // email: this.form.get('email').value,
        oldtransferPin: this.form.get('pin').value,
        // phone: this.form.get('phone').value,
        confirm_newtransferPin: this.form.get('confirm_pin2').value,
        newtransferPin: this.form.get('pin2').value,
      };

     const pin = this.form.get('pin').value;

      if (pin.length === 4) {
        console.log(pin);
        const data = {transferPin: pin}
        console.log('I am '+ data)
        this.authService.checkPin(data).subscribe(
         async (response : any) => {
            console.log(response);
            if(response.message === "Signature verification failed" && this.router.url !== '/auth-screen'){
              localStorage.removeItem('userData');
              localStorage.removeItem('res');
              localStorage.removeItem('accessT');
              this.toastController.create()
              this.presentToast('Session Expired.....Logging out', 'danger');
              this.router.navigateByUrl('/auth-screen');
              this.loadingCtl.dismiss();
            }
             else{
            
    if(response === "correct pin" ){
    this.loadingCtl.dismiss();
    
    
            this.hideLoader();
        this.modalCtrl.dismiss(response);
        this.presentLoading('Processing...', 'circular')
       
    
    
       console.log(formData)
       
       this.authService.changePin(formData).subscribe(
        (data: any) => {
          console.log(JSON.stringify(data))
          if(data.message === "Signature verification failed" && this.router.url !== '/auth-screen'){
            localStorage.removeItem('userData');
            localStorage.removeItem('res');
            localStorage.removeItem('accessT');
            this.toastController.create()
            this.presentToast('Session Expired.....Logging out', 'danger');
            this.router.navigateByUrl('/auth-screen');
            this.loadingCtl.dismiss();
          }
          else{
            if(data.status === false){
              this.toastController.create()
              this.presentToast(data + ', Please try again', 'danger');
              this.presentAlertx('Failed', 'Error occured!')
              this.loadingCtl.dismiss();
            } else{
              this.toastController.create()
              this.presentToast(data, 'success');
              this.presentAlertx('Success', 'Pin changed Sucessfully!')
              console.log('I got here')
              this.loadingCtl.dismiss();
            }
            
          
         // console.log(JSON.parse(data))
    
           }    
        },
        (error) => {
          console.error(error);
          console.log('Error found here')
          this.loadingCtl.dismiss();
        }
      );
      this.loadingCtl.dismiss();
    } else{
      const toast = await this.toastCtrl.create({
        message: 'Invalid User Pin. Please try again.',
        duration: 2000,
        position: 'bottom',
        color: 'danger'
      });
      toast.present();
      //this.router.navigateByUrl('/tabs')
      this.hideLoader();
      this.modalCtrl.dismiss(data);
      this.loadingCtl.dismiss();
    }
           this.loadingCtl.dismiss();
  }
          },
        async (error) => {
            console.log(error);
            const toast = await this.toastCtrl.create({
              message: 'Invalid User Pin. Please try again.',
              duration: 2000,
              position: 'bottom',
              color: 'danger'
            });
            toast.present();
            //this.router.navigateByUrl('/tabs')
            this.hideLoader();
            this.modalCtrl.dismiss(data);
            this.loadingCtl.dismiss();
          }
    
         
        );
      }
    
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
  
async showToastx( infoMessage: string){
    const toasty = await this.toastCtrl.create({
      message: infoMessage,
      duration: 2000,
      color: 'success'
    });
    toasty.present();
  }

  onVerifyOTP() {
    this.showLoader('Verifying...');
    if (this.otpForm.valid) {
      const data = { ...this.form.value, ...this.otpForm.value };
      this.authService.verifyOTP(data).subscribe(
       async (response) => {
          console.log(response);
          
if(response.status === "account activated successfully" ){
  const toasty = await this.toastCtrl.create({
    message: 'OTP verified successfully.',
    duration: 3000,
    position: 'bottom'
  });
  toasty.present();
 
}
          this.hideLoader();
      this.modalCtrl.dismiss(response);
      this.showToastx(response.status);
      this.router.navigateByUrl('/register/verify')
        },
      async (error) => {
          console.log(error);
          const toast = await this.toastCtrl.create({
            message: 'Invalid OTP. Please try again.',
            duration: 2000,
            position: 'middle',
            color: 'danger'
          });
          toast.present();
          this.router.navigateByUrl('/tabs')
          this.hideLoader();
          this.modalCtrl.dismiss(data);
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

  
  ngOnDestroy() {
    if (this.resendSubscription) {
      this.resendSubscription.unsubscribe();
    }
//timer session destroyer
    if (this.otpSubscription) {
      this.otpSubscription.unsubscribe();
    }
  }

}

