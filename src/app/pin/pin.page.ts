import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController, ModalController, ToastController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { PreferencesService } from '../services/storage.service';
import { ToastService } from '../services/toast.service';

@Component({
  selector: 'app-pin',
  templateUrl: './pin.page.html',
  styleUrls: ['./pin.page.scss'],
})
export class PinPage implements OnInit {
  userData: any;
  pin: string = "";
  isLoading = false;
  type = true;
  constructor(
    private alertController: AlertController,
    public router : Router,
    public loadingCtl : LoadingController,
  public toastCtl : ToastController,
  private loadingCtrl: LoadingController,
  private formBuilder: FormBuilder,
  private modalCtrl: ModalController,
  private toastCtrl: ToastController,
  private storage: PreferencesService,
  private authService: AuthService,
  private toastService: ToastService,
  ) { }

  ngOnInit() {

    const userDataString = localStorage.getItem('userData');
    if (userDataString) {
      this.userData = JSON.parse(userDataString);
    }

    this.setFocus();

  }

setFocus(){
    for (let i = 1; i <= 6; i++){
      if((this.pin.length + 1) == i){
        document.getElementById("pin" + i)
      }
    else {
      document.getElementById("pin" + i)
    }
  }
  }


  clear(){
    this.pin = "";
    this.setFocus();
  }

 //backspace last pin and focus on input
 back(){
  this.pin = this.pin.slice(0, -1);
  this.setFocus();
}


  //Loader
  async presentLoading(){
    const loading = await this.loadingCtl.create({
      message: 'Validating...',
      spinner: 'crescent'
    });
    await loading.present();
}
//Toast
async presentToast(message, color){
const toast = await this.toastCtl.create({
message : message,
color: color,
duration: 1000,
position: "bottom",

});
toast.present();
}

changeType() {
  this.type = !this.type;
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


//check and store pin
checkPin(){
  setTimeout(()=>{
    this.loadingCtl.dismiss();
    if (this.pin.length === 4) {
      console.log(this.pin);
      const data = {transferPin: this.pin}
      console.log('I am '+ data)
      this.authService.checkPin(data).subscribe(
       async (response) => {
          console.log(response);
          
if(response === "correct pin" ){
  const toasty = await this.toastCtrl.create({
    message: 'OTP verified successfully.',
    duration: 3000,
    position: 'bottom'
  });
  toasty.present();
 
}
          this.hideLoader();
      this.modalCtrl.dismiss(response);
      //this.showToastx(response.status);
      // this.router.navigateByUrl('/register/verify')
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
    if(this.pin === "7706"){
      this.presentToast("Pin found", "success");
    } else {
this.presentToast("Pin not found", "danger");
    }


  }, 2000);
}
//Set and Check pin if correct

set(number){
  this.pin += number;
  this.setFocus();
  
  if(this.pin.length == 4){
    this.presentLoading();
    this.checkPin()
  }
}


  
  async presentAlertx( subtitle?: string, message?: string) {
  const alert = await this.alertController.create({
    header: 'Velux Pay',
    subHeader: subtitle || 'Sub Account',
    message: message || 'Coming Soon...',
    buttons: [
      {
        text: 'Ok',
        cssClass: 'alert-button-confirm',
      },
    ],
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


verifications(){
  this.router.navigateByUrl('/accounts/verification')
}
subAccount(){
 // this.presentAlertx()
  this.presentAlertx('Sub Account', 'Coming Soon');
  //this.router.navigateByUrl('/settings/devices')
}

tag(){
  //this.presentAlertx()
  this.presentAlertx('Tag Name', 'Cannot be changed!');
  //this.router.navigateByUrl('/send')
}
name(){
  //this.presentAlertx()
  this.presentAlertx('Full Name', 'User Name cannot be changed!');
  //this.router.navigateByUrl('/settings/devices')
}
email(){
 // this.presentAlertx()
  this.presentAlertx('Email Address', 'User email cannot be changed!');
  //this.router.navigateByUrl('/settings/devices')
}

}
