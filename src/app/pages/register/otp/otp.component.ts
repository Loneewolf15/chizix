import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { LoadingController, ModalController, ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { PreferencesService } from 'src/app/services/storage.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.scss'],
})
export class OtpComponent implements OnInit {

  @ViewChild('otp1') input;
  otpString: string[] = ['', '', '', ''];
  isLoading = false;


  formData: any;
  otpForm: FormGroup;

  constructor(private route: ActivatedRoute, private fb: FormBuilder, private http: HttpClient, private router: Router,
    private formBuilder: FormBuilder,
    private modalCtrl: ModalController,
    private toastCtrl: ToastController,
    private storage: PreferencesService,
    private authService: AuthService,
    private toastService: ToastService,
    public loadingCtrl: LoadingController,
    ) {
    this.otpForm = this.fb.group({
      otp: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(4)]],
    });
  }

  ngOnInit() {
    this.formData = history.state.formData;
  }


  ionViewDidEnter() {
    console.log('ionViewDidEnter');
    setTimeout(() => {
      this.input.setFocus();
      console.log('enter');
    }, 500);
   }
 
   otp(event, prev, next, index) {
     console.log(event);
     const pattern = /[0-9]/;
     let inputChar = String.fromCharCode(event.which ? event.which : event.keyCode);
     if(!pattern.test(inputChar)) {
       console.log('invalid character');
       event.preventDefault();
       this.otpString[index] = '';
       return;
     }
     let value = event.target.value;
     if(value.length > 1) {
       this.otpString[index] = value;
     }
     if(value.length < 1 && prev) {
       prev.setFocus();
     } else if(next && value.length > 0) {
       next.setFocus();
     } else {
       if(next == '') {
         this.verifyOtp();
       } else return 0;
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
 
   joinOtpArray(otp) {
     if(!otp || otp == '') return 0;
     const otpNew = otp.join('');
     return otpNew;
   }
 
   async verifyOtp() {
     this.showLoader('Verifying...');
     let otp = this.joinOtpArray(this.otpString);
     // server access and verify otp

     //if(otp == '1234')
     if(this.authService.checkotp(otp).subscribe(
      (response) => {
        console.log('OTP Valid, Redirecting', response);


      },
      (error) => {
        console.error('Invalid OTP code!', error);
      }
    )) {
       this.otpString = ['', '', '', ''];
       this.hideLoader();
       this.modalCtrl.dismiss(otp);
     } else {
       const toast = await this.toastCtrl.create({
         message: 'Invalid OTP code!',
         duration: 5000,
         color: "danger"
       });
       toast.present();
       this.otpString = ['', '', '', ''];
       this.hideLoader();
     }
   }
 

  onSubmit() {
    if (this.otpForm.valid) {
      // Send registration data and OTP to backend API
      const otp = { ...this.formData, otp: this.otpForm.value.otp };

      this.authService.checkotp(otp).subscribe(
        (response) => {
          console.log('Registration successful!', response);


        },
        (error) => {
          console.error('Registration failed!', error);
        }
      );

      // this.http.post('https://example.com/register.php', postData).subscribe(
      //   (response) => {
      //     // Handle success response
      //     console.log(response);
      //     this.router.navigate(['/success-page']);
      //   },
      //   (error) => {
      //     // Handle error response
      //     console.log(error);
      //   }
      // );
    }
  }
}

