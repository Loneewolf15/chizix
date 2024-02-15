import { Component, NO_ERRORS_SCHEMA, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { PreferencesService } from 'src/app/services/storage.service';
import { ToastService } from 'src/app/services/toast.service';
import { Router } from '@angular/router';
import { AlertController, IonicModule, ModalController, ToastController } from '@ionic/angular';
import { AuthConstants } from 'src/app/config/auth-constants';
import { EmailModalComponent } from 'src/app/email-modal/email-modal.component';
import { LoadingController } from '@ionic/angular';
import { interval, Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone:true,
  imports:[
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
  ],
    schemas:[NO_ERRORS_SCHEMA]
})


export class RegisterPage implements OnInit {

  
  header: any;
  status: any;
  message: any;

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
  c_form: FormGroup;
  showOtpForm = false;
  showForm2 = false;

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
    private alertController : AlertController,
    private authService: AuthService,
    private modalController: ModalController,
    private toastService: ToastService,
  ) {
    this.initForm();
  }



  customCounterFormatter(inputLength: number, maxLength: number) {
    return `${maxLength - inputLength} characters remaining`;
  }

  customCounterFormatterE(inputLength: number, maxLength: number) {
    return `${maxLength - inputLength} characters remaining`;
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
      // name: ['', Validators.required],
      // email: ['', [Validators.required, Validators.email]],
      // password: ['', [Validators.required, Validators.minLength(6)]],
      // confirmPassword: ['', Validators.required],

      // fullname: new FormControl(null, {validators: [Validators.required]}),
      // tagname: new FormControl(null, {validators: [Validators.required, Validators.minLength(4)]}),
      email: new FormControl(null, {validators: [Validators.required, Validators.email]}),
      // phone: new FormControl(null, {validators: [Validators.required, Validators.minLength(11), Validators.maxLength(12)]}),
      confirm_password: new FormControl(null, {validators: [Validators.required, this.matchingPasswords.bind(this)]}),

      password: new FormControl(null, {validators: [Validators.required, Validators.minLength(6)]})
    });

    this.otpForm = new FormGroup({
      otp: new FormControl(null, {validators: [Validators.required]}),
    });
    
    this.c_form = new FormGroup({
      fullname: new FormControl(null, {validators: [Validators.required]}),
      tagname: new FormControl(null, {validators: [Validators.required, Validators.minLength(4)]}),
      address: new FormControl(null, {validators: [Validators.required]}),
      phone: new FormControl(null, {validators: [Validators.required, Validators.minLength(11), Validators.maxLength(12)]}),
      
    });

    
  }


  matchingPasswords(control: any) {
    if (this.form) {
      if (control.value !== this.form.controls['password'].value) {
        return { mismatchedPasswords: true };
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

  async showAlert(message) {
    const alert = await this.alertController.create({
      header: 'Registration Failed',
      message,
      buttons: ['OK'],
    });

    await alert.present();
  }
  

  
  async  signup() {
    const loading = await this.loadingCtrl.create({
      message: 'Please wait...',
    });
    await loading.present();
    // perform form submission here

    if (this.form.valid) {
      const formData = {
        // fullname: this.form.get('fullname').value,
        email: this.form.get('email').value,
        // tagname: this.form.get('tagname').value,
        // phone: this.form.get('phone').value,
        confirm_password: this.form.get('confirm_password').value,
        password: this.form.get('password').value,
      };

     

      this.authService.register(formData).subscribe(
        async (response) => {
          console.log(response);

            if(response.message === "registeration successful" ){
              this.showOtpForm = true;
              localStorage.setItem('veluxite_id', response.data.veluxite_id);
            }

            if(response.status === "there is an error"){
              let msg = response.data.email_err;
              
              this.showAlert(msg);
            }
           
             console.log('Email:', formData.email);
         // this.router.navigateByUrl('/otp');


        },
        (error) => {
          console.error('Registration failed!', error);
        //  this.showOtpForm = true;
          //this.toastService.showToast('Check your internet connection || Network connection failed')
        }
      );
      console.log(formData);

      console.log('I got Here')
    }
    
    await loading.dismiss();
  
    
  }


  async  signupC() {
    const loading = await this.loadingCtrl.create({
      message: 'Please wait...',
    });
    await loading.present();
    // perform form submission here

    if (this.form.valid) {
      const formDataC = {
        fullname: this.c_form.get('fullname').value,
        email: this.form.get('email').value,
         tagname: this.c_form.get('tagname').value,
         phone: this.c_form.get('phone').value,
        address: this.c_form.get('address').value,
        veluxite_id: localStorage.getItem('veluxite_id'),
      };

     

      this.authService.registerF(formDataC).subscribe(
        async (response) => {
          console.log('Registration successful!', response);

            if(response.message === "registeration successful" ){
             // this.showOtpForm = true;
             this.emailPr('account activated successfully', 'Transaction Successful');
            }
           
             console.log('Email:', formDataC.email);
         // this.router.navigateByUrl('/otp');


        },
        (error) => {
          console.error('Registration failed!', error);
        //  this.showOtpForm = true;
          //this.toastService.showToast('Check your internet connection || Network connection failed')
        }
      );
      console.log(formDataC);

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

  signupv() {
this.showOtpForm = true;
  }

  onVerifyOTPx(){
   // this.emailPr('account activated successfully', 'Transaction Successful');

    this.showOtpForm = false;
    this.showForm2 = true;
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
  
  this.showOtpForm = false;
  this.showForm2 = true;
  const toasty = await this.toastCtrl.create({
    message: 'OTP verified successfully.',
    duration: 3000,
    position: 'bottom'
  });
  toasty.present();
 
}
          this.hideLoader();
    //  this.modalCtrl.dismiss(response);
      this.showToastx(response.status);
      //this.router.navigateByUrl('/register/verify')
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
          //this.emailPr('error ocurred', 'Transaction Successful');
          //this.router.navigateByUrl('/tabs')
          this.hideLoader();
          this.modalCtrl.dismiss(data);
        }

       
      );
    }
  }



  async emailPr(status: string, title?: string, subtitle?: string) {
    let message: string;
    let imgSrc: string;
    // let subHeader : string;
  
    switch (status) {
      case 'account activated successfully':
        message = `Hello Veluxite! Thank you for picking VeluxPay. Your Transfer pin has been sent to your mail, you can choose to change it in settings.`;
        // subHeader = 'Transaction SuccessFul'
        imgSrc = 'assets/images/em.png';
        break;

        case 'error ocurred':
          message = `Sorry sign up again Lahor......`;
          // subHeader = 'Transaction SuccessFul'
          imgSrc = 'assets/images/em.png';
          break;
     
      default:
        message = 'Are you sure you want to sign out?';
        imgSrc = 'assets/imgs/em.png';
        break;
    }
  
   
    //this.status = status || 'Unknown';
   
    this.header = title || 'Welcome to Velux Pay';
   
    this.message = message;  
  
    const modal = await this.modalController.create({
      component: EmailModalComponent,
      
      componentProps: {
       
        message: this.message,
        imgSrc: imgSrc,
        
      },
      cssClass: 'transaction-modal',
    });
  
    await modal.present();
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
