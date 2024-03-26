import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalController, ToastController } from '@ionic/angular';
import { AuthConstants } from 'src/app/config/auth-constants';
import { AuthService } from 'src/app/services/auth.service';
import { PreferencesService } from 'src/app/services/storage.service';
import { ToastService } from 'src/app/services/toast.service';
import { OtpComponent } from './otp/otp.component';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  form: FormGroup;
  type: boolean = true;
  verified = false;
  verifiedNumber: any;
  verifiedEmail: boolean;
  registrationForm: any;
  formBuilder: any;
  submitted = false;
 

    constructor(
      private router: Router,
      private modalCtrl: ModalController,
      private toastCtrl: ToastController,
      private storage: PreferencesService,
      private authService: AuthService,
      private toastService: ToastService,
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

  ngOnInit() {}




   
 initForm() {
  this.form = new FormGroup({
    name: new FormControl(null, {
      validators: [Validators.required]
    }),
    phone: new FormControl(null, {
      validators: [Validators.required, Validators.minLength(11), Validators.maxLength(11)]
    }),
    email: new FormControl(null, {
      validators: [Validators.required, Validators.email]
    }),
    tag: new FormControl(null, {
      validators: [Validators.required]
    }),
    password: new FormControl(null, {
      validators: [Validators.required, Validators.minLength(6)]
    }),
    
    // confirm_password: new FormControl(null, {
    //   validators: [Validators.required, this.matchValues('password', 'confirm_password')]
    // }),
    // confirm_password: new FormControl(null, {
    //   validators: [null, Validators.required]
    // })
  
});
   }
    
    

 
  public postData = {
    email: '',
    password: '',
    tagname: '',
    confirm_password: '',
    fullname: '',
    phone: '',
  }

 

  

  changeType() {
    this.type = !this.type;
  }
  validateData(){
    let fullname = this.postData.fullname;
    let phone = this.postData.phone;
    let tagname = this.postData.tagname;
    let confirm_password = this.postData.confirm_password;

    let email = this.postData.email;
    let password = this.postData.password;

    return(
      this.postData.email &&
      this.postData.password &&
      this.postData.fullname &&
      this.postData.phone &&
      this.postData.tagname &&
      this.postData.confirm_password &&
      email.length > 0 &&
      password.length > 0 &&
      fullname.length > 0 &&
      phone.length > 0 &&
      tagname.length > 0 &&
      confirm_password.length > 0 

    );
  }



  signup() {
    if(this.validateData() && !this.form.valid){
      this.form.markAllAsTouched();
      this.submitted = true;

      return(
         this.postData.email &&
      this.postData.password &&
      this.postData.fullname &&
      this.postData.phone &&
      this.postData.tagname &&
      this.postData.confirm_password &&
      this.postData.email.length > 0 &&
      this.postData.password.length > 0 &&
      this.postData.fullname.length > 0 &&
      this.postData.phone.length > 0 &&
      this.postData.tagname.length > 0 &&
      this.postData.confirm_password.length > 0 
  
      );
     } 
    
    this.authService.signup(this.postData).subscribe((res: any) => {
      if(this.authService.adduser(this.validateData)){
        // var myFormData = new FormData();

        // myFormData.append('fullName', this.form.value.fullname);
        // myFormData.append('myEmail', this.form.value.email);
        // myFormData.append('myPass', this.form.value.password);
    
         ///this.authService.adduser(this.validateData)
        //this.storage.store(AuthConstants.AUTH, res.data)
        console.log(this.postData);
       // return this.verifyViaOtp();
        this.router.navigateByUrl('/tabs', {replaceUrl: true});

        console.log(res)
        this.toastService.showToast(' Register Success')
      } else {
      this.toastService.showToast('Invalid Parameters Passed for Email || Password')
      }
    },
    (err: any) => {
      this.toastService.showToast('Bad Request || Network connection failed')
    }
    )
    //this.toastService.showToast(this.postData)
   // this.toastService.showToast(this.form.value);
    // this.router.navigateByUrl('/tabs', {replaceUrl: true});
  }; 












  signUp() {
    if(!this.form.valid) {
      this.form.markAllAsTouched();
      return;
    }
    console.log(this.form.value);
  }



  
  async verifyViaOtp() {
    console.log('otp', this.form.value.phone);
    const phoneNumber = this.form.value.phone;
    if(phoneNumber && phoneNumber?.length == 11) {
      const options: any = {
        component: OtpComponent
      };
      const modal = await this.modalCtrl.create(options);
      await modal.present();
      const { data } = await modal.onWillDismiss();
      if(data) {
        // work on it
        console.log('otp: ', data);
        this.verified = true;
        this.verifiedNumber = phoneNumber;
      }
    } else {
      const toast = await this.toastCtrl.create({
        message: 'Please enter proper Phone Number',
        duration: 5000,
        color: "danger"
      });
      toast.present();
    }    
  }


  async verifyViaOtpX() {
    console.log('otp', this.form.value.email);
    const emailAddress = this.form.value.email;
    if(emailAddress && emailAddress?.length == 10) {
      const options: any = {
        component: OtpComponent
      };
      const modal = await this.modalCtrl.create(options);
      await modal.present();
      const { data } = await modal.onWillDismiss();
      if(data) {
        // work on it
        console.log('otp: ', data);
        this.verified = true;
        this.verifiedEmail = emailAddress;
      }
    } else {
      const toast = await this.toastCtrl.create({
        message: 'Please enter proper email Number',
        duration: 5000,
        color: "danger"
      });
      toast.present();
    }    
  }


  changeNumber(event) {
    const phoneNumber = this.form.value.phone;
    if(phoneNumber && phoneNumber?.length == 10) {
      if(this.verifiedNumber && phoneNumber == this.verifiedNumber) {
        this.verified = true;
      } else {
        this.verified = false;
      }
    }
  }

  
  changeEmail(event) {
    const email = this.form.value.email;
    if(email && email?.length == 10) {
      if(this.verifiedEmail && email == this.verifiedEmail) {
        this.verified = true;
      } else {
        this.verified = false;
      }
    }
  }

}