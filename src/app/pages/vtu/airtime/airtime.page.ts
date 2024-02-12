import { Component, NO_ERRORS_SCHEMA, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, ModalController, ToastController, AlertController, IonicModule } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { PreferencesService } from 'src/app/services/storage.service';
import { ToastService } from 'src/app/services/toast.service';
import { FormControl, FormBuilder, FormGroup, Validators, FormsModule } from '@angular/forms';
import { TransactionStatusComponent } from 'src/app/transaction-status/transaction-status.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-airtime',
  templateUrl: './airtime.page.html',
  styleUrls: ['./airtime.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
  ],
  schemas: [NO_ERRORS_SCHEMA]
})
export class AirtimePage implements OnInit {

  public formData = {
    phone: '',
    amount: '',
    pin: '',
  }
  public formDatax = {
    phone: '',
    amount: '',
   
  }

  phone: string;
  amountx: number;
  pin: string;

  showContent = true;
  cardValue = '';
  serviceIDx = '';
  showContent1 = true;
  showContent2 = false;
  form: FormGroup;
  isLoading = false;
  type = true;
  verified = false;
  provider: string;
  phoneNumber: string;
  amount: number;
  selectedTag: any;
  header: string;
  status: string;
  message: string;
 
  constructor(
    //  private registrationService: RegistrationService, 
    private loadingCtrl: LoadingController,
    private loadingController: LoadingController,
    private formBuilder: FormBuilder,
    private router: Router,
    private modalCtrl: ModalController,
    public loadingCtl : LoadingController,
    private modalController: ModalController,
    private toastCtrl: ToastController,
    private toastController: ToastController,
    private storage: PreferencesService,
    private authService: AuthService,
    private toastService: ToastService,
    private alertController : AlertController,
  ) {
   
   // this.initForm();
  }

  initForm() {
    this.form = new FormGroup({
      

    //  serviceID: new FormControl(null, {validators: [Validators.required]}),
      // tagname: new FormControl(null, {validators: [Validators.required]}),
     // email: new FormControl(null, {validators: [Validators.required, Validators.email]}),
      phone: new FormControl(null, {validators: [Validators.required]}),
      pin: new FormControl(null, {validators: [Validators.required, Validators.minLength(4), Validators.maxLength(4)]}),
      amountx: new FormControl(null, {validators: [Validators.required, Validators.minLength(3)]})

    });

   
    

    
  }

  validateData(){
    let phone = this.formDatax.phone;
    let amount = this.formDatax.amount;
    let pin = this.formData.pin;

    return(
      this.formDatax.phone &&
      this.formDatax.amount &&
      this.formData.pin &&
      phone.length > 0 &&
      amount.length > 0 &&
      pin.length > 0

    );
  }


  ngOnInit() {
    this.phoneNumber = '';
    this.formDatax.amount = '';
    this.pin = '';

  }

  logCardValue(value: string) {
    this.cardValue = value;
    console.log(value);
  }

  //  this.serviceIDx = cardValue;
  


   
async presentToast(message: string, color: string) {
  const toast = await this.toastController.create({
    message: message,
    duration: 2000,
    position: 'bottom',
    color: color
  });
  toast.present();
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
  
  async presentLoading( message: string, spinnerx: any){
    const loading = await this.loadingCtl.create({
      message: message,
      spinner: spinnerx
    });
    await loading.present();
  }
  
  hideLoader() {
  if(this.isLoading) this.isLoading = false;
  return this.loadingCtrl.dismiss()
  .then(() => console.log('dismissed'))
  .catch(e => console.log(e));
  }


  async presentAirtimeAlertx(status: string,  amount: any, title?: string, subtitle?: string) {

    let message: string;
    switch (status) {
      case 'successful':
        message = `You have successfully purchased airtime of ${amount} `;
        break;
      case 'insuficient funds':
        message = `Transaction amount greater than wallet balance. <br> ${amount}`;
        break;
      case 'transaction failed':
        message = `We could not complete your request at this moment, please try again shortly.`;
        break;
      default:
        message = 'An unknown error occurred.';
        break;
    }

    const alert = await this.alertController.create({
      header: title,
      //subHeader: subtitle,
      message: message,
      buttons: [{
        text: 'OK',
        cssClass: 'purple-button',
        handler: () => {
          if (status !== 'failed') {
            this.router.navigateByUrl('/tabs');
          }
        }
      }],
      backdropDismiss: false,
      cssClass: 'custom-alert',
      animated: true,
      mode: 'ios',
      //translucent: true,
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


  async presentAirtimeAlert(status: string, amount: any, title?: string, subtitle?: string) {
    let message: string;
    let imgSrc: string;
    // let subHeader : string;
  
    switch (status) {
        case 'successful':
        message = `You have successfully purchased airtime of ₦${amount} `;
        imgSrc = 'assets/imgs/success.png';
        break;
        case 'insuficient funds':
          message = `Transaction amount greater than wallet balance. <br> ₦${amount}.00`;
          imgSrc = 'assets/imgs/failed.png';
        break;
        case 'airtime purchase failed':
          message = `We could not complete your request at this moment, please try again shortly.`;
          imgSrc = 'assets/imgs/less.png';
        break;
        case 'Duplicate transaction detected':
          message = `We noticed that this transaction is a duplicate transaction, please try again shortly.`;
          imgSrc = 'assets/imgs/less.png';
        break;
      default:
        message = 'An unknown error occurred!!<br>Please try again later';
        imgSrc = 'assets/imgs/less.png';
        break;

        
    }
  
    this.header = title || 'Airtime Status';
    this.status = status || 'Unknown';
    this.amount = amount || '50';
    this.message = message;
    
  
    const modal = await this.modalController.create({
      component: TransactionStatusComponent,
      componentProps: {
        header: this.header,
        status: this.status,
        amount: this.amount,
        message: this.message,
        imgSrc: imgSrc,
        subHeader: subtitle,
      },
      cssClass: 'transaction-modal',
    });
  
    await modal.present();
  }
  





 topUp() {
  console.log(this.serviceIDx = this.cardValue + ' i am here');
  // Validate form input
  // if (!this.provider || !this.phoneNumber || !this.amount) {
  //   this.provider, this.phoneNumber, this.amount
  //   return   console.log(this.serviceIDx = this.cardValue + ' i am herey');;
  // }
  const vtuData = {
    network_id: this.cardValue ,
    phone: this.phone,
    amount: this.amountx
  }
  const requestData = {
    userPin: this.pin,
  };
  console.log(this.serviceIDx = this.cardValue + ' i am herey' + JSON.stringify(requestData) + JSON.stringify(vtuData))

   //check if pin exists in database and proceed to purchase data

//check and store pin
this.presentLoading('Validating...', 'crescent')
if (this.pin.length === 4) {
  console.log(this.pin);
  const data = {transferPin: this.pin}
  console.log('I am '+ data)
  this.authService.checkPin(data).subscribe(
   async (response : any) => {
      console.log(response);
      console.log(response.message);
      if(response.message === "Signature verification failed" && this.router.url !== '/auth-screen' &&  response.message === "Session has expired." && this.router.url === "/vtu/airtime"){
        this.toastController.create()
        this.presentToast('Session Expired.....Logging out', 'danger');
        this.router.navigateByUrl('/auth-screen');
      }
      else{
      
if(response === "correct pin" ){
const toasty = await this.toastCtrl.create({
message: 'Pin is Valid.',
duration: 3000,
position: 'bottom'
});
//toasty.present();
this.loadingCtl.dismiss();



      this.hideLoader();
  this.modalCtrl.dismiss(response);
  //this.showToastx(response.status);
  // this.router.navigateByUrl('/register/verify')
  ///proceed to buy the data plan
  this.presentLoading('Processing your request...', 'circular')
  this.authService.airtime(vtuData).subscribe(
    (data: any) => {
      console.log(JSON.stringify(data))
      if(data.message === "Signature verification failed" && this.router.url !== '/auth-screen' && this.router.url === "/vtu/airtime"){
        localStorage.removeItem('userData');
        localStorage.removeItem('res');
        localStorage.removeItem('accessT');
        this.toastController.create()
        this.presentToast('Session Expired.....Logging out', 'danger');
        this.router.navigateByUrl('/auth-screen');
      }
      else{
        if(data.message === 'insuficient funds'){
          this.toastController.create()
          this.presentToast(data.message + ', Please fund your account and try again', 'danger');
          this.presentAirtimeAlert(data.message, ` ₦${vtuData.amount}`, 'Transaction Failed');
          this.loadingCtl.dismiss();
        } else if(data.message === "INSUFFICIENT_BALANCE"){
          this.toastController.create()
          this.presentToast(data.message + ', An unknown error occured please try again shortly.', 'danger');
          this.presentAirtimeAlert('transaction failed', ` ₦${vtuData.amount}`, 'Incomplete Request');
          //this.presentToast('Session Expired.....Logging out', 'danger');
          this.loadingCtl.dismiss();
        }
        else if(data.message === "AMOUNT_BELOW_MIN"){
          this.toastController.create()
          this.presentToast('Amount entered below minimum value.', 'danger');
          this.presentAirtimeAlert('transaction failed', ` ₦${vtuData.amount}`, 'Incomplete Request');
          //this.presentToast('Session Expired.....Logging out', 'danger');
          this.loadingCtl.dismiss();
        }
         else{
          this.toastController.create()
          this.presentToast(data, 'success');
          this.loadingCtl.dismiss();
        }
      
      
     // console.log(JSON.parse(data))

       }   
    
    },
    (error) => {
      console.error(error);
      console.log('Error found here')
      this.loadingCtl.dismiss();
    }
  );
 
      
     this.loadingCtl.dismiss(data);
    } 
else{
  const toast = await this.toastCtrl.create({
    message: 'Invalid User Pin. Please try again.',
    duration: 2000,
    position: 'bottom',
    color: 'danger'
  });
  toast.present();
  //this.router.navigateByUrl('/tabs')
  console.log('Hello Dickson')
  this.loadingCtrl.dismiss();
  this.hideLoader();
  this.modalCtrl.dismiss(data);
  console.log('I am here')
  this.loadingCtrl.dismiss();
}
 ///else condition ends here

      }
    },
    async (error) => {
    
      console.log(error);
      const toast = await this.toastCtrl.create({
        message: 'Invalid User Pin. Please try again.',
        duration: 2000,
        position: 'bottom',
        color: 'danger'
      });
      toast.present();
      //this.router.navigateByUrl('/tabs')
      console.log('Hello Dickson')
      this.loadingCtrl.dismiss();
      this.hideLoader();
      this.modalCtrl.dismiss(data);
      console.log('I am here')
      this.loadingCtrl.dismiss();
    }


   
  );
  this.loadingCtrl.dismiss();

}


this.loadingCtrl.dismiss();
  if(this.validateData() && !this.form.valid){
    this.form.markAllAsTouched();
    return(
      this.formData.phone &&
      this.formData.amount &&
      this.formData.phone.length > 0 &&
      this.formData.amount.length > 0

    );
   } 
 return true;
}

}
