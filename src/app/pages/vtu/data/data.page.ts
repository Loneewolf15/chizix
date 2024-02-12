import { Component, NO_ERRORS_SCHEMA, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, ModalController, ToastController, AlertController, IonicModule } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { PreferencesService } from 'src/app/services/storage.service';
import { ToastService } from 'src/app/services/toast.service';
import { FormControl, FormBuilder, FormGroup, Validators, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-data',
  templateUrl: './data.page.html',
  styleUrls: ['./data.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
  ],
  schemas: [NO_ERRORS_SCHEMA]
})
export class DataPage implements OnInit {

  
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
  variationid: string;
  ip: any;
  services: any[] = [];
  arrayData: any[] = [];
  selectedOptiony: any;
  data: []
  public plans: any[];
  filteredOptions: any[];
  searchTerm: string = '';
  selectedValue: string;
  price: string;
  selectedPlanx: any;  
  selectedPlan: any = { displayName: '', value: '', price: '' };
  selectedOption: { displayName: string, newprice: number, datapsck: string, initialprice: any, variationid: any };
  constructor(
    //  private registrationService: RegistrationService, 
    private loadingCtrl: LoadingController,
    private loadingController: LoadingController,
    public loadingCtl : LoadingController,
    private formBuilder: FormBuilder,
    private router: Router,
    private modalCtrl: ModalController,
    private modalController: ModalController,
    private toastCtrl: ToastController,
    private toastController: ToastController,
    private storage: PreferencesService,
    private authService: AuthService,
    private toastService: ToastService,
    private alertController : AlertController,
  ) {
    this.variationid = '';
    this.ip = '';
   // this.initForm();
  }

  async presentToast(message: string, color: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      position: 'bottom',
      color: color
    });
    toast.present();
  }
  
  
  ngOnInit() {
    
  }

    onOptionSelected() {
    // Here you can define the logic to retrieve the price related to the selected option
    // For example, you can use Array.find() to get the selected option from the options array
    this.selectedOption = this.plans.find(plan => plan.datapsck === this.selectedOption.datapsck);
    console.log(this.selectedOption.datapsck)
    console.log(this.selectedOption);
    this.variationid = this.selectedOption.variationid;
    this.ip = this.selectedOption.initialprice;

  }

  onValueChange(value) {
    this.price = this.plans.find(plan => plan.value === this.selectedPlan)?.price;
    console.log(this.selectedPlan)
    console.log(this.price)
  }

  updatePrice() {
    const selectedPlan = this.plans.find((plan) => plan.value === this.selectedPlan.value);
    if (selectedPlan) {
      this.selectedPlan.price = selectedPlan.price;
    }
    console.log('selectedPlan', this.selectedPlan.value)
  }
  

  

  logCardValue(value: string) {
    this.cardValue = value;
    console.log(value);
    this.getSME();
  }
  logCardValuex(value: string) {
    this.cardValue = value;
    console.log(value);
    this.getMtn();
    
  }
  logCardValuey(value: string) {
    this.cardValue = value;
    console.log(value);
    this.getAirtel();
  }

  logCardValuea(value: string) {
    this.cardValue = value;
    console.log(value);
    this.getEtisalat();
  }
  logCardValuez(value: string) {
    this.cardValue = value;
    console.log(value);
    this.getGlo();
  }

  logCardValued(value: any) {
    this.cardValue = value;
    console.log(value);
   
  }

  

  filterItems() {
    // filter the options based on the user's search term
    this.filteredOptions = this.plans.filter(plan => {
      return plan.displayName.toLowerCase().indexOf(this.searchTerm.toLowerCase()) > -1;
    });
  }

  getGlo() {
    this.authService.glo().subscribe(
      (response: any) => {
        if(response.message === "Signature verification failed" && this.router.url !== '/auth-screen'  && this.router.url === '/vtu/data'){
          localStorage.removeItem('userData');
          localStorage.removeItem('res');
          localStorage.removeItem('accessT');
            this.toastController.create()
            this.presentToast('Session Expired.....Logging out', 'danger');
            this.router.navigateByUrl('/auth-screen');
          }
        else{

         this.plans = response;
         
          for (const item of response) {
            this.variationid = item.variationid;
            this.ip = item.initialprice;
            console.log(this.variationid, this.ip);
          }
          
 // Save values to local storage
 localStorage.setItem('variationid', this.variationid);
 localStorage.setItem('initialprice', this.ip);

          
//this.arrayData = JSON.parse(response);
const data = this.plans
this.filteredOptions = this.plans
          ///logic goes here 
        console.log('Returned Data', response);
          
       console.log(response);
       console.log(JSON.stringify(response));

console.log(JSON.stringify(this.plans));
console.log(data + 'are you good?')



}
      },
      (error) => {
        if(this.router.url === '/vtu/data'){
          this.toastService.showToast('Could not complete your request try again!')
           console.error('Could not complete your request try again!', error);
        }
      }
    );
  }

  getEtisalat() {
    this.authService.etisalat().subscribe(
      (response: any) => {
        if(response.message === "Signature verification failed" && this.router.url !== '/auth-screen'  && this.router.url === '/vtu/data'){
          localStorage.removeItem('userData');
          localStorage.removeItem('res');
          localStorage.removeItem('accessT');
            this.toastController.create()
            this.presentToast('Session Expired.....Logging out', 'danger');
            this.router.navigateByUrl('/auth-screen');
          }
        else{

         this.plans = response;
          this.variationid = response.variationid;
          this.ip = response.initialprice;

          for (const item of response) {
            this.variationid = item.variationid;
            this.ip = item.initialprice;
            console.log(this.variationid, this.ip);
          }
          
 // Save values to local storage
 localStorage.setItem('variationid', this.variationid);
 localStorage.setItem('initialprice', this.ip);

//this.arrayData = JSON.parse(response);
this.filteredOptions = this.plans
const data = this.plans
          ///logic goes here 
        console.log('Returned Data', response);
          
       console.log(JSON.stringify(response));
       console.log(JSON.stringify(response));

console.log(JSON.stringify(this.plans));
console.log(data + 'are you good?')



}
      },
      (error) => {
        if(this.router.url === '/vtu/data'){
          this.toastService.showToast('Could not complete your request try again!')
           console.error('Could not complete your request try again!', error);
        }
      }
    );
  }

  
  getMtn() {
    this.authService.mtnCorp().subscribe(
      (response: any) => {
        if(response.message === "Signature verification failed" && this.router.url !== '/auth-screen'  && this.router.url === '/vtu/data'){
          localStorage.removeItem('userData');
          localStorage.removeItem('res');
          localStorage.removeItem('accessT');
            this.toastController.create()
            this.presentToast('Session Expired.....Logging out', 'danger');
            this.router.navigateByUrl('/auth-screen');
          }
        else{

         this.plans = response;
         
         for (const item of response) {
            this.variationid = item.variationid;
            this.ip = item.initialprice;
            console.log(this.variationid, this.ip);
          }
          
 // Save values to local storage
 localStorage.setItem('variationid', this.variationid);
 localStorage.setItem('initialprice', this.ip);

        
//this.arrayData = JSON.parse(response);
this.filteredOptions = this.plans
const data = this.plans
const variation_id = this.variationid
          ///logic goes here 
        console.log('Returned Data', response);
          
       console.log(JSON.stringify(response));
       console.log(JSON.stringify(response));

console.log(JSON.stringify(this.plans));
console.log(data + 'are you good?')



}
      },
      (error) => {
        if(this.router.url === '/vtu/data'){
          this.toastService.showToast('Could not complete your request try again!')
           console.error('Could not complete your request try again!', error);
        }
      }
    );
  }



  getAirtel() {
    this.authService.airtel().subscribe(
      (response: any) => {
        if(response.message === "Signature verification failed" && this.router.url !== '/auth-screen'  && this.router.url === '/vtu/data'){
          localStorage.removeItem('userData');
          localStorage.removeItem('res');
          localStorage.removeItem('accessT');
            this.toastController.create()
            this.presentToast('Session Expired.....Logging out', 'danger');
            this.router.navigateByUrl('/auth-screen');
          }
        else{

         this.plans = response;
          this.variationid = response.variationid;
          this.ip = response.initialprice;
        
          for (const item of response) {
            this.variationid = item.variationid;
            this.ip = item.initialprice;
            console.log(this.variationid, this.ip);
          }
          
 // Save values to local storage
 localStorage.setItem('variationid', this.variationid);
 localStorage.setItem('initialprice', this.ip);

          
//this.arrayData = JSON.parse(response);
this.filteredOptions = this.plans
const data = this.plans
          ///logic goes here 
        console.log('Returned Data', response);
          
       console.log(JSON.stringify(response));
       console.log(JSON.stringify(response));

console.log(JSON.stringify(this.plans));
console.log(data + 'are you good?')



}
      },
      (error) => {
       
        if(this.router.url === '/vtu/data'){
          this.toastService.showToast('Could not complete your request try again!')
           console.error('Could not complete your request try again!', error);
        }
      }
    );
  }

  getSME() {
    this.authService.mtn().subscribe(
      (response: any) => {
       
        if(response.message === "Signature verification failed" && this.router.url !== '/auth-screen'  && this.router.url === '/vtu/data'){
            localStorage.removeItem('userData');
            localStorage.removeItem('res');
            localStorage.removeItem('accessT');
            this.toastController.create()
            this.presentToast('Session Expired.....Logging out', 'danger');
            this.router.navigateByUrl('/auth-screen');
          }
        else{

         this.plans = response;
          this.variationid = response.variationid;
          this.ip = response.initialprice;

          for (const item of this.plans) {
            this.variationid = item.variationid;
            this.ip = item.initialprice;
            console.log(this.variationid, this.ip);
          }
          
 // Save values to local storage
 localStorage.setItem('variationid', this.variationid);
 localStorage.setItem('initialprice', this.ip);

          
//this.arrayData = JSON.parse(response);
this.filteredOptions = this.plans
const data = this.plans
          ///logic goes here 
        console.log('Returned Data', response);
          
       console.log(JSON.stringify(response));
       console.log(JSON.stringify(response));

console.log(JSON.stringify(this.plans));
console.log(data + 'are you good?')



}
      },
      (error) => {
        console.error('Could not complete your request try again!', error);
       if(this.router.url === '/vtu/data'){
         this.toastService.showToast('Could not complete your request try again!')
       }
       
      }
    );
  }

  async presentDataAlert(status: string,  amount: any, title?: string, subtitle?: string) {

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

dataX(){
  
  console.log(this.serviceIDx = this.cardValue + ' i am here');
  const vtuData = {
    network_id: this.cardValue ,
    phone: this.phone,
    variation_id: this.variationid,
    initialprice: this.ip,
    amount: this.selectedOption.newprice,
  
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
          // if(response.message === "Signature verification failed" || "Session has expired."){
          //   this.toastController.create()
          //   this.presentToast('Session Expired.....Logging out', 'danger');
          //   this.router.navigateByUrl('/auth-screen');
          // }
          // else{
          
  if(response === "correct pin" ){
  const toasty = await this.toastCtrl.create({
    message: 'Pin is Valid.',
    duration: 3000,
    position: 'bottom'
  });
  toasty.present();
  this.loadingCtl.dismiss();
  
  
          this.hideLoader();
      this.modalCtrl.dismiss(response);
      //this.showToastx(response.status);
      // this.router.navigateByUrl('/register/verify')
      ///proceed to buy the data plan
      this.presentLoading('Purchasing Plan...', 'circular')
      this.authService.data(vtuData).subscribe(
        (data: any) => {
          console.log(JSON.stringify(data))
          console.log(data.message + ' is here ')
          if(response.message === "Signature verification failed" && this.router.url !== '/auth-screen'  && this.router.url === '/vtu/data'){
            localStorage.removeItem('userData');
            localStorage.removeItem('res');
            localStorage.removeItem('accessT');
            this.toastController.create()
            this.presentToast('Session Expired.....Logging out', 'danger');
            this.router.navigateByUrl('/auth-screen');
          }
          else{
            console.log('Here Now')
            if(data.message === 'insuficient funds'){
              this.presentDataAlert(data.message, ` ₦${vtuData.amount}`, 'Transaction Failed');
              this.toastController.create()
              this.presentToast(data.message + ', Please fund your account and try again', 'danger');
              this.loadingCtl.dismiss();
            } else{
              this.toastController.create()
              this.presentToast(data.message, 'success');
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
         // }
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
          this.loadingCtl.dismiss();
          this.hideLoader();
          this.modalCtrl.dismiss(data);
          console.log('I am here')
          this.loadingCtl.dismiss();
        }
  
       
      );
     
    }
  //   if(this.pin === "7706"){
  //     this.presentToast("Pin found", "success");
  //   } else {
  // this.presentToast("Pin not found", "danger");
  //   }
  
  
  
  

  // if(this.pin === "1206"){
  //   // this.authService.airtime(vtuData).subscribe
  //   // }
  //   console.log('Pin is correct', vtuData)
    
  //   this.authService.data(vtuData).subscribe(
  //     (data: any) => {
  //       console.log(JSON.stringify(data))
  //       if(data.message === "Signature verification failed"){
  //         this.toastController.create()
  //         this.presentToast('Session Expired.....Logging out', 'danger');
  //         this.router.navigateByUrl('/auth-screen');
  //       }
  //       else{
  //         if(data.message === 'insuficient funds'){
  //           this.toastController.create()
  //           this.presentToast(data.message + ', Please fund your account and try again', 'danger');
  //         } else{
  //           this.toastController.create()
  //           this.presentToast(data.message, 'success');
  //         }
          
        
  //      // console.log(JSON.parse(data))

  //       }
       
  //     },
  //     (error) => {
  //       console.error(error);
  //       console.log('Error found here')
    
  //     }
  //   );

}
  

}
