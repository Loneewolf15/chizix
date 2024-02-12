import { Component, NO_ERRORS_SCHEMA, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PreferencesService } from 'src/app/services/storage.service';
import { AuthService } from 'src/app/services/auth.service';
import { AuthConstants } from 'src/app/config/auth-constants';

import { ToastService } from 'src/app/services/toast.service';
import { AlertController, IonicModule, ToastController } from '@ionic/angular';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-sign-in-sub',
  templateUrl: './sign-in-sub.component.html',
  styleUrls: ['./sign-in-sub.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, ReactiveFormsModule],
  schemas: [NO_ERRORS_SCHEMA],
})
export class SignInSubComponent implements OnInit {

  form: FormGroup;
  type = true;
  
  public postData = {
    email: '',
    password: '',
  }
  //toastCtrl: any;

  constructor(
    private router: Router,
    private preferences: PreferencesService,
    private authService: AuthService,
    private toastService: ToastService,
    private toastCtrl: ToastController,
    private alertController : AlertController,
   // private fingerPrint: FingerprintAIO
  ) { 
    this.initForm();
  }

  ngOnInit() {}

  initForm() {
    this.form = new FormGroup({
      email: new FormControl(null, {validators: [Validators.required]}),
      password: new FormControl(null, {validators: [Validators.required, Validators.minLength(6)]})
    });
  }

  changeType() {
    this.type = !this.type;
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
      // subHeader: subtitle || 'Sub Account',
      message: message || 'Coming Soon...',
      buttons: [
        {
          text: 'CLOSE',
          cssClass: 'alert-button-confirm',
        },
      ],
     // backdropDismiss: false,
      cssClass: 'custom-alert',
      animated: true,
      // mode: 'ios',
      //translucent: false,
     
    });
    await alert.present();
  }


  customCounterFormatter(inputLength: number, maxLength: number) {
    return `${maxLength - inputLength} characters remaining`;
  }

  customCounterFormatterE(inputLength: number, maxLength: number) {
    return `${maxLength - inputLength} characters remaining`;
  }

  onSubmit() {
    if(this.validateData() && !this.form.valid){
      this.form.markAllAsTouched();
      return(
        this.postData.email &&
        this.postData.password &&
        this.postData.email.length > 0 &&
        this.postData.password.length > 0
  
      );
     } 
    
    this.authService.subloginfunc(this.form.value).subscribe((res: any) => {
      if(res.status === 'true'){
     
        //this.preferences.set(AuthConstants.AUTH, res);
        this.preferences.store(AuthConstants.AUTH, res.data);
       // localStorage.setItem('res', JSON.stringify(res.data));
        console.log(this.postData);
        this.router.navigateByUrl('/receive/receivesub', {replaceUrl: true});

        console.log(res)
        console.log(res.access_token);
        localStorage.setItem('subUserData', JSON.stringify(res.data.loginData));
        localStorage.setItem('accessT', JSON.stringify(res.access_token));
        //this.showToastx('Success')
        
        this.showToastx(res.message)
      } else {
      //this.toastService.showToast('Invalid Parameters Passed for Email || Password')
      this.toastService.showToast(res.message);
   
      }
    },
    (err: any) => {
      console.log(err);
      this.toastService.showToast('Check your internet connection || Network connection failed')
      this.presentAlertx('Failed to establish connection, please check your network connectivity!');
     // this.toastService.showToast(err.message)
    }
    )
    return true;

  }; 

 

}
