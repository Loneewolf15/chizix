import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PreferencesService } from 'src/app/services/storage.service';
import { AuthService } from 'src/app/services/auth.service';
import { AuthConstants } from 'src/app/config/auth-constants';

import { ToastService } from 'src/app/services/toast.service';
import { ToastController } from '@ionic/angular';
//import { FingerprintAIO } from '@ionic-native/fingerprint-aio/ngx';


@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent implements OnInit {

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

  async showToastx( infoMessage: string){
    const toasty = await this.toastCtrl.create({
      message: infoMessage,
      duration: 2000,
      color: 'success'
    });
    toasty.present();
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
    
    this.authService.loginfunc(this.postData).subscribe((res: any) => {
      if(res.status === 'true'){

        //this.preferences.set(AuthConstants.AUTH, res);
        this.preferences.store(AuthConstants.AUTH, res.data);
       // localStorage.setItem('res', JSON.stringify(res.data));
        console.log(this.postData);
        this.router.navigateByUrl('/tabs', {replaceUrl: true});

        console.log(res)
        console.log(res.access_token);
        localStorage.setItem('accessT', JSON.stringify(res.access_token));
        //this.showToastx('Success')
        
        this.showToastx(res.message)
      } else {
      //this.toastService.showToast('Invalid Parameters Passed for Email || Password')
      this.toastService.showToast(res.message);
   
      }
    },
    (err: any) => {
      this.toastService.showToast('Check your internet connection || Network connection failed')
     // this.toastService.showToast(res.status)
    }
    )
    //this.toastService.showToast(this.postData)
   // this.toastService.showToast(this.form.value);
    // this.router.navigateByUrl('/tabs', {replaceUrl: true});
  }; 

 


  // onSubmit(){
    
  //   if(this.validateData() && !this.form.valid){
  //     this.form.markAllAsTouched();
  //     this.authService.loginfunc(this.postData).subscribe((res: any) => {
  //       if(res){
  //         //const res = rep.userData;
  //         // this.storage.store(AuthConstants.AUTH, res.userData)
  //         // this.router.navigateByUrl('/tabs', {replaceUrl: true});

  //         // console.log(res.userData)
  //         // console.log(this.postData);
  //         console.log(res);
  //       } else {
  //         console.log('Invalid Parameters Passed for Email || Password');
  //         console.log(this.postData);
          
  //       }
  //     },
  //     (err: any) => {
  //       console.log('Bad Request || Network connection failed')
  //      // console.log(res.status);
  //      // console.log('Data:' + this.postData)
  //     }
  //     )
      
  //   } else {
  //     console.log('Informations not provided')
  //   }
  // }
}
