import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { PreferencesService } from 'src/app/services/storage.service';
import { ToastService } from 'src/app/services/toast.service';
import { Router } from '@angular/router';
import { AlertController, ModalController, ToastController } from '@ionic/angular';
import { AuthConstants } from 'src/app/config/auth-constants';

import { LoadingController } from '@ionic/angular';
import { interval, Subscription } from 'rxjs';


@Component({
  selector: 'app-register2',
  templateUrl: './register2.page.html',
  styleUrls: ['./register2.page.scss'],
})


export class RegisterPage2 implements OnInit {

  


  

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
    private alertController: AlertController,
  ) {
    this.initForm();
  }

  matchValues(password: string, confirm_password: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls['password'];
      const matchingControl = formGroup.controls['confirm_password'];
  
      if (matchingControl.errors && !matchingControl.errors.mustMatch) {
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

// this.authService.userData$.subscribe((res: any) => {
//   this.form. = res;
//   console.log(res)
// })

  ngOnInit() {
    //timer to resend OTP starter
    this.startOTPTimer();
  }

  initForm() {
    this.form = new FormGroup({

      tagname: new FormControl(null, {validators: [Validators.required]}),
   
      confirm_password: new FormControl(null, {validators: [Validators.required, this.matchingPasswords.bind(this)]}),

      password: new FormControl(null, {validators: [Validators.required, Validators.minLength(6)]})
    });

  
    

    
  }


  matchingPasswords(control: any) {
    if (this.form) {
      if (control.value !== this.form.controls.password.value) {
        return { mismatchedPasswords: true };
      }
    }

    return null;
  }


  
  async presentAlertr( subtitle?: string, message?: string) {
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
      // Add the image to the alert
      // inputs: [
      //   {
      //     type: 'image',
      //     src: status === 'successful' ? 'assets/imgs/received.png' : 'assets/imgs/sent.png'
      //   }
      // ]
    });
    await alert.present();
  }
  




  goToLogin(){
    this.router.navigateByUrl('/auth-screen')
  }


  changeType() {
    this.type = !this.type;
  }

  signupx() {
    if (this.form.valid) {
      // Navigate to OTP page if form is valid
      this.router.navigate(['/otp-page'], {
        state: {
          formData: this.form.value,
        },
      });
    }
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


  
  async  enroll() {
    const loading = await this.loadingCtrl.create({
      message: 'Please wait...',
    });
    await loading.present();
    // perform form submission here

    if (this.form.valid) {
      const formData = {
        // fullname: this.form.get('fullname').value,
        // email: this.form.get('email').value,
        user_tag: this.form.get('tagname').value,
        // phone: this.form.get('phone').value,
        confirm_password: this.form.get('confirm_password').value,
        password: this.form.get('password').value,
      };

     

      this.authService.createSub().subscribe(
        (response: any) => {
          console.log('Sub Account Creation successful!', response);
             // Call OTP page here
             ///this.showOtpForm = true;
             if(response.message === 'registration failed'){
              this.toastService.showToast(response.message+', Please try again shortly')
              this.router.navigateByUrl('/register2')
             } else if(response.message === "Signature verification failed" && this.router.url !== '/auth-screen'){
              localStorage.removeItem('userData');
              localStorage.removeItem('res');
              localStorage.removeItem('accessT');
              this.toastService.showToast('Session Expired.....Logging out')
       
              this.router.navigateByUrl('/auth-screen');
            }
             else{
              
              this.showToastx(response.message)
              this.presentAlertr('Success', `Sub Account successfully created and your user_tagname is ${response.subaccount}!`)
              this.router.navigateByUrl('/subaccount')
             }
             console.log('TagName:', formData.user_tag);
         // this.router.navigateByUrl('/otp');


        },
        (error) => {
          console.error('Unable to complete failed request!', error);
          this.presentAlertr('Failed', `Sub Account creation failed, Please try again!`)
          this.router.navigateByUrl('/register2')
          this.toastService.showToast('Check your internet connection || Network connection failed')
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

