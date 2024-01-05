import { Component, NO_ERRORS_SCHEMA, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PreferencesService } from 'src/app/services/storage.service';
import { AuthService } from 'src/app/services/auth.service';
import { AuthConstants } from 'src/app/config/auth-constants';

import { ToastService } from 'src/app/services/toast.service';
import { AlertController, IonicModule, LoadingController, ToastController } from '@ionic/angular';
import { finalize } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { Preferences } from '@capacitor/preferences';



@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, ReactiveFormsModule],
  schemas: [NO_ERRORS_SCHEMA],
})
export class SignInComponent implements OnInit {

  form: FormGroup;
  emailForm: FormGroup;
  form1: FormGroup;
  type = true;
  showForgotPassForm = false;
  isLoading: Boolean;
  
  public postData = {
    email: '',
    password: '',
  }
  public sendData = {
    email: ''
  }

  darkMode = false;

  public sendData2 = {
    otp: '',
    password: '',
    cpassword: ''
    
  }
  //toastCtrl: any;

  constructor(
    private router: Router,
    private preferences: PreferencesService,
    private authService: AuthService,
    private toastService: ToastService,
    private toastCtrl: ToastController,
    private alertController : AlertController,
    private loadingCtl: LoadingController,
  
   // private fingerPrint: FingerprintAIO
  ) { 
    this.initForm();
  }

  ngOnInit() {
  
    this.checkAppMode();
  }


  async checkAppMode() {
    const checkIsDarkMode = await Preferences.get({key: 'darkModeActivated'});
    console.log(checkIsDarkMode);
    checkIsDarkMode?.value == 'true'
      ? (this.darkMode = true)
      : (this.darkMode = false);
    document.body.classList.toggle('dark', this.darkMode);
  }

  toggleDarkMode() {
    this.darkMode = !this.darkMode;
    document.body.classList.toggle('dark', this.darkMode);
    if(this.darkMode) {
      Preferences.set({key: 'darkModeActivated', value: 'true'}); 
    } else {
      
      Preferences.set({key: 'darkModeActivated', value: 'false'});
    }
  }

  
  initForm() {
    this.form = new FormGroup({
      email: new FormControl(null, {validators: [Validators.required]}),
      password: new FormControl(null, {validators: [Validators.required, Validators.minLength(6)]})
    });
  

    
    this.emailForm = new FormGroup({
      emailx: new FormControl(null, {validators: [Validators.required]}),
    });

    this.form1 = new FormGroup({
      otp: new FormControl(null, {validators: [Validators.required, Validators.minLength(4), Validators.maxLength(6)]}),
      password: new FormControl(null, {validators: [Validators.required, Validators.minLength(6)]}),
      confirm_password: new FormControl(null, {validators: [Validators.required, this.matchingPasswords.bind(this)]}),

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


  changeType() {
    this.type = !this.type;
  }
  logIn(){
    if(this.router.url === '/auth-screen'){
      
      this.loginfunc();
      
      setTimeout(() => {
        
        this.loadingCtl.dismiss();
        this.isLoading = false;
      }, 10000);
      this.isLoading = false;
  
  }
  }
  validateData(){
    let email = this.postData.email;
    let password = this.postData.password;

    return(
      this.postData.email &&
      this.postData.password &&
      email.length > 0 &&
      password.length > 0

    );
  }


  customCounterFormatter(inputLength: number, maxLength: number) {
    return `${maxLength - inputLength} characters remaining`;
  }

  customCounterFormatterE(inputLength: number, maxLength: number) {
    return `${maxLength - inputLength} characters remaining`;
  }

  validateDatax(){
    let email = this.sendData.email;
  
    return(
      this.sendData.email &&
      email.length > 0 
     
    );
  }

  validateDatay(){
    let otp = this.sendData2.otp;
    let pass = this.sendData2.password;
    let c_p = this.sendData2.cpassword;
  
    return(
      this.sendData2.otp &&
      this.sendData2.password &&
      this.sendData2.cpassword &&
      otp.length > 0 &&
      pass.length > 0 &&
      c_p.length > 0
     
    );
  }

  
  async presentLoading( message: string, spinnerx: any){
    const loading = await this.loadingCtl.create({
      message: message,
      spinner: spinnerx
    });
    await loading.present();
  }

  register(){
   this.router.navigateByUrl('/register') 
  }

  async showToastx( infoMessage: string){
    const toasty = await this.toastCtrl.create({
      message: infoMessage,
      duration: 2000,
      color: 'success'
    });
    toasty.present();
  }


  async presentAlertx( message?: string) {
    const alert = await this.alertController.create({
      header: 'Network Error',
      message: message || 'Coming Soon...',
      buttons: [
        {
          text: 'CLOSE',
          cssClass: 'alert-button-confirm',
        },
      ],
      cssClass: 'custom-alert',
      animated: true,

     
    });
    await alert.present();
  }

  loginfunc() {
    if(this.validateData() && !this.form.valid){
      this.form.markAllAsTouched();
      return(
        this.postData.email &&
        this.postData.password &&
        this.postData.email.length > 0 &&
        this.postData.password.length > 0
      );
    } 
  
    this.presentLoading('Loggin in...', 'bubbles')
    console.log(this.form.value)
    this.authService.loginfunc(this.form.value)
      .pipe(
        finalize(() => {
          this.loadingCtl.dismiss();
        })
      ).subscribe((res: any) => {
        if(res.status === 'true'){
        //  this.setCredential()
          this.preferences.store(AuthConstants.AUTH, res.data);
          console.log(this.postData);
          this.router.navigateByUrl('/tabs', {replaceUrl: true});
          console.log(res)
          console.log(res.access_token);
          localStorage.setItem('accessT', JSON.stringify(res.access_token));
          localStorage.setItem('userData', JSON.stringify(res.data));
          this.showToastx(res.message)
        } else {
          this.toastService.showToast(res.message);
          let msg = 'Check your internet connection || Network connection failed'
        if(res.message == 'invalid user login detail') {
          msg = 'Email Id could not be found';
        } else if(res.message == 'invalid password') {
          msg = 'Please enter correct password';
        }
        this.showAlert(msg);
        }
      },
      (err: any) => {
        this.isLoading = false;
        this.loadingCtl.dismiss()
        console.log(err);
        this.toastService.showToast('Check your internet connection || Network connection failed')
        this.presentAlertx('Failed to establish connection, please check your network connectivity!');
        
  
      }
    );
    return true;
  };


  async showAlert(message) {
    const alert = await this.alertController.create({
      header: 'Authentication Failed',
      message,
      buttons: ['OK'],
    });

    await alert.present();
  }
  
 

  resetP() {
    if(this.validateDatax() && !this.form.valid){
      this.form.markAllAsTouched();
      return(
        this.sendData.email &&
        this.sendData.email.length > 0
  
      );
     } 
     
     this.presentLoading('Processing...', 'dots')
    this.authService.forgotP(this.sendData)
    .pipe(
      finalize(() => {
        this.loadingCtl.dismiss();
      })
  ).subscribe((res: any) => {
      

      console.log(res);
     
      if(res.message = 'email sent'){
console.log('I got'+ res)
this.showForgotPassForm = true;
      }
    },
    (err: any) => {
      console.log(err);
      this.toastService.showToast('Check your internet connection || Network connection failed')
      this.presentAlertx('Failed to establish connection, please check your network connectivity!');
     
    }
    )
  return true;
  }; 


  resetPx(){
    if(this.validateDatay() && !this.form.valid){
      this.form.markAllAsTouched();
      return(
      this.sendData2.otp &&
      this.sendData2.password &&
      this.sendData2.cpassword &&
      this.sendData2.otp.length > 0 &&
      this.sendData2.password.length > 0 &&
      this.sendData2.cpassword.length > 0
     
    );
     } 
     
     this.presentLoading('Processing...', 'dots')
    this.authService.forgotPx(this.sendData2)
    .pipe(
      finalize(() => {
        this.loadingCtl.dismiss();
      })
  ).subscribe((res: any) => {
      

      console.log(res);
     
      if(res.message = 'password reset successful'){
console.log('I got'+ res)
this.showForgotPassForm = false;
//this.modal.dismiss()
      }
      return true;
    },
    (err: any) => {
      console.log(err);
      this.toastService.showToast('Check your internet connection || Network connection failed')
      this.presentAlertx('Failed to establish connection, please check your network connectivity!');
     
    }
    )
  return true;
  };
  
}
