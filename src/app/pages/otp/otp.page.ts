import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LoadingController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-otp',
  templateUrl: './otp.page.html',
  styleUrls: ['./otp.page.scss'],
})
export class OtpPage implements OnInit {
  showSpinner = false;
  otpForm: FormGroup;
  constructor(
    private authService: AuthService,
    private toastService: ToastService,
    private loadingCtrl: LoadingController,
  ) { }

  ngOnInit() {
    this.otpForm = new FormGroup({
      otp: new FormControl(null, {validators: [Validators.required]}),
    });
    
  }

  onVerifyOTP() {
    if (this.otpForm.valid) {
      const data = {...this.otpForm.value };
      this.authService.verifyOTP(data).subscribe(
        (response) => {
          console.log(response);
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }


}
