import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController, ModalController, ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { PreferencesService } from 'src/app/services/storage.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-password-change',
  templateUrl: './password-change.page.html',
  styleUrls: ['./password-change.page.scss'],
})
export class PasswordChangePage implements OnInit {
  form: FormGroup;
  isLoading = false;
  type = true;

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
  }


  matchValues(pin: string, confirm_pin: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls['pin'];
      const matchingControl = formGroup.controls['confirm_pin'];
  
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

  initForm() {
    this.form = new FormGroup({
      
      old_pin: new FormControl(null, {validators: [Validators.required, Validators.minLength(4), Validators.maxLength(4)]}),
      pin: new FormControl(null, {validators: [Validators.required, Validators.minLength(4), Validators.maxLength(4)]}),
      confirm_pin: new FormControl(null, {validators: [Validators.required, this.matchingPasswords.bind(this)]}),

      
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
  async  signup() {
    const loading = await this.loadingCtrl.create({
      message: 'Please wait...',
    });
    await loading.present();
    // perform form submission here

    if (this.form.valid) {
      const formData = {
        fullname: this.form.get('pin').value,
        email: this.form.get('old_pin').value,
        tagname: this.form.get('confirm_pin').value,
      };

     

      // this.authService.register(formData).subscribe(
      //   (response) => {
      //     console.log('Registration successful!', response);
      //        // Call OTP page here
            
      //        console.log('Email:', formData.email);
         


      //   },
      //   (error) => {
      //     console.error('Registration failed!', error);
     
      //     this.toastService.showToast('Check your internet connection || Network connection failed')
      //   }
      // );
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
  

}
