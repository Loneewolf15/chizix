import { CommonModule } from '@angular/common';
import {  Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { BarcodeScanner, ScanResult } from '@capacitor-community/barcode-scanner';
import { AlertController, IonicModule, LoadingController, ModalController, ToastController } from '@ionic/angular';
import { IonText } from '@ionic/angular';


import { AuthService } from 'src/app/services/auth.service';
import { PreferencesService } from 'src/app/services/storage.service';
import { ToastService } from 'src/app/services/toast.service';
import { SwiperOptions } from 'swiper/types';
import { TransactionStatusComponent } from 'src/app/transaction-status/transaction-status.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/compiler';


@Component({
  selector: 'app-mtransfer',
  templateUrl: './mtransfer.page.html',
  styleUrls: ['./mtransfer.page.scss'],
  standalone: true,
  imports: [     CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,],
})
export class MtransferPage implements OnInit {
  @ViewChild('inputField') inputField: any;
  @ViewChild('selectedTagText', { static: true }) selectedTagText: IonText;
  selectedTag: any;
  header: any;
  status: any;
  message: any;
  scanActive: boolean = false;

  accounts: any[] = [];
   bannerConfig: SwiperOptions;
   results: any[] = []
  transactions: any[] = [];
  isModalOpen = false;
  // https://www.npmjs.com/package/angularx-qrcode
  qrCodeString = 'This is a secret qr code message';
  popoverController: any;
  filterForm: any;
  scannedResult: any;
  // barScannedResult: any;
  content_visibility = '';
  amount: any = "";
  filteredTags: any[] = []; // initialize filteredTags array
  searchTerm: any = ''; // initialize searchTerm variable
userData: any;
pin: any = "";
isLoading = false;
type = true;
userImage: any;
getBalance: any;
  showBalance = false;
  selectedTags: any[] = [];
  formattedPrice: any;
  
tagName: any[] = [];
tagNamex: any = [];

  setOpen(isOpen: boolean) {
    if(this.router.url !== '/tabs/mt'){
      this.isModalOpen = false;
    }
    else{
      this.isModalOpen = isOpen;
    this.pin = "";
    this.setFocus();
    }
  
  }
pin1Color: string = '';
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
  private toastController: ToastController,
  private modalController: ModalController,
  ) { 
    setInterval(() => {
      console.log("fetching users.....huurraay");
      this.getTagname();
      this.balance();
    }, 45000);  //runs every 1 second
   
  }

  // onPinChange(index: number) {
  //   const value = this.pin[index];
  //   this.pin1Color = value ? 'green' : 'red';
  // }
 
  ngOnInit() {
  const userDataString = localStorage.getItem('userData');
  if (userDataString) {
    this.userData = JSON.parse(userDataString);
  }
this.getImage();
  this.balance();
  this.getTagname();
}


async presentToaxt(message: string, color: string) {
  const toast = await this.toastController.create({
    message: message,
    duration: 2000,
    position: 'bottom',
    color: color
  });
  toast.present();
}

getImage() {
  const storedImage = localStorage.getItem('userImage');
  if (storedImage) {
    this.userImage = JSON.parse(storedImage);
  }
}

formatPrice(getBalance: number): string {
  return getBalance.toLocaleString();
}


balance(){
  this.getBalance = JSON.parse(localStorage.getItem('balance'));
  console.log(this.getBalance)
  this.formattedPrice = this.formatPrice(this.getBalance);
  
 console.log(this.formattedPrice)
}


onTagSelectx(tag: any) {
  this.selectedTag = tag;
  console.log(tag.full_name);
  console.log("userSelected" + tag.full_name + tag.user_tag)
  this.modalController.dismiss();
}


onTagSelect(tag: any) {
  const existingTag = this.selectedTags.find(selectedTag => selectedTag.user_tag === tag.user_tag);
  if (!existingTag) {
    this.selectedTags.push(tag);
    console.log("Tag added:", tag);
  } else {
    console.log("Tag already selected:", tag);
  }
}

///Logic to remove selected user when user click
onSelectedTagClick(selectedTag: any) {
  this.selectedTags = this.selectedTags.filter(tag => tag.user_tag !== selectedTag.user_tag);
  console.log("Tag removed:", selectedTag);
}

///filter the tagname on search here 

filterTagx() {
  console.log(this.filteredTags)
  if (!Array.isArray(this.tagName)) {
    return; // handle error condition
  }
  this.filteredTags = this.tagName.filter(tag => tag.full_name.toLowerCase().includes(this.searchTerm.toLowerCase()));
  this.filteredTags = this.tagName.filter(tag => tag.user_tag.toLowerCase().includes(this.searchTerm.toLowerCase()));

}

filterTag() {
  console.log(this.filteredTags);
  if (!Array.isArray(this.tagName)) {
    return; // handle error condition
  }
  this.filteredTags = this.tagName.filter(
    (tag) =>
      tag.full_name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      tag.user_tag.toLowerCase().includes(this.searchTerm.toLowerCase())
  );
}

searchx(event) {
  const query = event.detail.value;
  console.log(query)
  if (query !== '') {
    this.filteredTags = this.tagName.filter(tag => tag.includes(query));
  } else {
    this.results = [];
  }
}

search(event) {
  const query = event.detail.value;
  console.log(query);
  if (query !== '') {
    this.filteredTags = this.tagName.filter(
      (tag) =>
        tag.full_name.toLowerCase().includes(query.toLowerCase()) ||
        tag.user_tag.toLowerCase().includes(query.toLowerCase())
    );
  } else {
    this.results = [];
  }
}

getTagname(){
  this.authService.getTagnamex().subscribe(
    (response: any) => {
      if(response.message === "Signature verification failed" && this.router.url !== '/auth-screen' && this.router.url === '/tabs/mt'){
        localStorage.removeItem('userData');
        localStorage.removeItem('res');
        localStorage.removeItem('accessT');
        this.toastController.create()
        this.presentToast('Session Expired.....Logging out', 'danger');
        this.router.navigateByUrl('/auth-screen');
      }
      else{
console.log(response)
        this.tagName = response;
//this.arrayData = JSON.parse(response.plans);
//this.filteredOptions = this.plans
//const data = this.plans userData?.loginData.user_tag
        ///logic goes here 
        for(let res of response){
          console.log(res.full_name)
         // this.tagName = res;
        }
        const loggedInUserTag = localStorage.getItem('userData') ? JSON.parse(localStorage.getItem('userData')).loginData.user_tag : null;

        if (loggedInUserTag) {
          this.tagName = this.tagName.filter(tag => tag.user_tag !== loggedInUserTag);
        }
        //localStorage.setItem('tagName', JSON.stringify(response));
        //this.tagNamex = localStorage.getItem('tagName');
       
        this.filteredTags = [...this.tagName];
      console.log('Returned Data', response);
        console.log('Fullnames', response.full_name);


}
    },
    (error) => {
      if(this.router.url === '/tabs/mt'){
        this.toastService.showToast('Could not complete your request try again!')
         console.error('Could not complete your request try again!', error);
      }
    }
  );
}


logSelectedTag(tag: any) {
  console.log(tag.full_name);
  console.log("userSelected" + tag.full_name + tag.user_tag);
}


searcheed(event) {
  const query = event.detail.value;
  this.authService.getTagname(query).subscribe((data: any[]) => {
    this.results = data;
  });
}





async checkPermission() {
  try {
    // check or request permission
    const status = await BarcodeScanner.checkPermission({ force: true });
    if (status.granted) {
      // the user granted permission
      return true;
    }
    else if(status.denied){
const alert = await this.alertController.create({
  header:'Access Denied',
  message: 'Allow Access to Camera to enable scan function',
  buttons: [{
    text: 'No',
    role: 'Cancel'
  },{
    text: 'Go to Settings',
    handler:()=>{
      BarcodeScanner.openAppSettings();
      return false;
    }
  }]
});
await alert.present()
    }else{
      return false;
    }
    return false;
  } catch(e) {
    console.log(e);
  }
  return false;
}

async startScan() {
  //this.scanActive = true;
  try {
    const permission = await this.checkPermission();
    if (!permission) {
      return;
    }
    this.scanActive = true;
   // else{
    if (this.router.url !== '/tabs/mt') {
      this.stopScan();
    }
    this.scanActive = true;
    this.selectedTag = {};
    
    //await BarcodeScanner.hideBackground();
    this.scanActive = true;
     const bodyElement = document.querySelector('body');
    // if (bodyElement) {
    //   bodyElement.classList.add('scanner-active');
    // }
    this.content_visibility = 'hidden';
    const result = await BarcodeScanner.startScan();
    console.log(result);
    BarcodeScanner.showBackground();
    if (bodyElement) {
      bodyElement.classList.remove('scanner-active');
    }
    this.content_visibility = '';
    if (result?.hasContent) {
      this.scanActive = false;
      this.scannedResult = JSON.parse(result.content);
      this.selectedTag = this.scannedResult;
      console.log(JSON.parse(this.scannedResult));
      console.log('hello' + this.scannedResult.user_tag);
      // merge the qr scanner result with that of the selected tag
      // this.selectedTag.user_tag  = this.scannedResult?.user_tag;
      console.log('Heyyhoo', this.scannedResult.user_tag);
      console.log('Holdup', this.scannedResult['user_tag']);
    }
  //}
  } catch (e) {
    console.log(e);
  }
}


stopScan() {
  this.scanActive = false;
  BarcodeScanner.showBackground();
  BarcodeScanner.stopScan();
  document.querySelector('body').classList.remove('scanner-active');
  this.content_visibility = '';
}





  

  set(value: any) {
    console.log(value)   

     this.amount += value;
  }


clear(){
  this.amount = "";
  
}

//backspace last amount and focus on input

setx(number: any){
  this.amount += number;
 
  
}

back(){
  // this.inputField.value =  this.inputField.value.slice(0, -1);
  
  this.amount =  this.amount.slice(0, -1);
}




setFocus() {
  // Retrieve the color mode of the app
  const appColorMode = document.body.classList.contains('dark') ? 'dark' : 'light';

  for (let i = 1; i <= 4; i++) {
    const inputElem = document.getElementById("pin" + i) as HTMLElement;
    if (inputElem) {
      // Check the color mode and set background color accordingly
      if (appColorMode === 'dark') {
        if (i <= this.pin.length) {
          console.log('dark')
          inputElem.style.background = "var(--ion-color-warning)";
        } else {
          inputElem.style.background = "var(--ion-color-white)";
        }
      } else {
        if (i <= this.pin.length) {
          inputElem.style.background = "var(--ion-color-dark)";
        } else {
          inputElem.style.background = "var(--ion-color-light)";
        }
      }
    }
  }

  // Update parent element background based on pin length
  const parentElem = document.querySelector('.numberBox') as HTMLElement;
  parentElem.style.background = this.pin.length === 4 ? "var(--ion-color-base)" : "var(--ion-color-base)";
}







clear1(){
  this.pin = "";
  this.setFocus();
}

//backspace last pin and focus on input
back1(){
this.pin = this.pin.slice(0, -1);
this.setFocus();
}


//Loader
async presentLoading( message: string, spinnerx: any){
  const loading = await this.loadingCtl.create({
    message: message,
    spinner: spinnerx
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


async presentSendAlert(status: string, amount: any, title?: string, subtitle?: string) {
  let message: string;
  let imgSrc: string;

  const totalUsers = this.selectedTags.length;

  const firstTagname = this.selectedTags.length > 0 ? this.selectedTags[0].user_tag : '';
  const remainingUsers = totalUsers - 1;
  // Check if 'amount' is a valid numeric value
  amount = parseFloat(this.amount)* this.selectedTags.length;
  if (isNaN(amount)) {
    // Handle the case where 'amount' is not a valid number
    console.error('Invalid amount:', amount);
    return;
  }

  // Format the amount with commas
  const formattedAmount = amount.toLocaleString();

  switch (status) {
    case 'successful':
      message = `You have successfully sent ₦${formattedAmount} into Velux user @${firstTagname} and ${remainingUsers} others wallet.`;
      imgSrc = 'assets/imgs/success.png';
      break;
    case 'insufficient fund':
      message = `Your request to send ₦${formattedAmount} to @${firstTagname} and ${remainingUsers} others could not be completed due to insufficient funds in your account.`;
      imgSrc = 'assets/imgs/failed.png';
      break;
    case 'failed':
      message = 'Sorry!! <br> We could not complete your request at this time, Please enter an amount greater than ₦50.';
      imgSrc = 'assets/imgs/less.png';
      break;
    default:
      message = 'An unknown error occurred!!<br>Please try again later';
      imgSrc = 'assets/imgs/less.png';
      break;
  }

  this.header = title || 'Transaction Status';
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



checkPin(){
setTimeout(()=>{
  this.loadingCtl.dismiss();
 
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
//toasty.present();
this.loadingCtl.dismiss();


        this.hideLoader();
    this.modalCtrl.dismiss(response);
    //this.showToastx(response.status);
    // this.router.navigateByUrl('/register/verify')
    ///proceed to buy the data plan
    this.presentLoading('Processing...', 'circular')
    this.isModalOpen = false;

   const sendData = {
    amount: this.amount ,
    tagname: this.selectedTags.map(tag => tag.user_tag),
    // selectedTags: userTags,
   }
   console.log(sendData)

const selectedTags = this.selectedTags;
const amount = this.amount;

   const arrayData = selectedTags.map((tag) => {
    return{
      amount: amount,
      tagname: tag.user_tag,
    };
   });

   
   
   this.authService.mtr(arrayData).subscribe(
    (data: any) => {
      console.log('Hello'+JSON.stringify(data))
      console.log('Fun Time'+data)
      if(data.message === "Signature verification failed" && this.router.url !== '/auth-screen' && this.router.url === '/tabs/mt'){
        localStorage.removeItem('userData');
        localStorage.removeItem('res');
        localStorage.removeItem('accessT');
        this.toastController.create()
        this.presentToast('Session Expired.....Logging out', 'danger');
        this.router.navigateByUrl('/auth-screen');
      }
    
      else{
        console.log('here');
        if(data.message === 'insufficient fund'){
          console.log('Hello mate'+ data.message)
          this.toastController.create()
          this.presentToast(data.message + 's, Please fund your account and try again', 'danger');
         // this.router.navigateByUrl('/tabs')
         this.presentSendAlert(data.message, ` ₦${sendData.amount}`, 'Incomplete Transaction');
          this.loadingCtrl.dismiss();
        } else if(data.message === 'some transfers failed'){
          
          this.toastController.create()
          this.presentToast(data.message, 'danger');
          this.presentSendAlert('failed', ` ₦${sendData.amount}`, 'Transaction Failed');
          console.log('Cameth hereAmount');
          
        //  this.router.navigateByUrl('/tabs')
          this.loadingCtrl.dismiss(); 
        }
        
        else if(data.message === 'All transfers successful'){

          this.toastController.create()
          this.presentToast(data.message, 'success');
          this.presentSendAlert('successful', ` ₦${sendData.amount}`, 'Transaction Successful');
          console.log('Cameth here');
          
        //  this.router.navigateByUrl('/tabs')
          this.loadingCtrl.dismiss();
        } else{
          this.toastController.create()
          this.presentToast(data.message, 'danger');
          this.router.navigateByUrl('/tabs')
          this.loadingCtrl.dismiss();
        }
        console.log('I reach here')
       // this.router.navigateByUrl('/auth-screen')
        this.loadingCtrl.dismiss();
      
     // console.log(JSON.parse(data))

       }    
    },
    (error) => {
      console.error(error);
      console.log('Error found here')
      this.loadingCtl.dismiss();
      this.isModalOpen = false;
    }
  );
  //this.router.navigateByUrl('/auth-screen')
  this.loadingCtrl.dismiss();
  } else{  
    this.isModalOpen = false;
    const toast = await this.toastCtrl.create({
    
      message: 'Invalid User Pin. Please try again.',
      duration: 2000,
      position: 'bottom',
      color: 'danger'
    });
    toast.present();
    //this.router.navigateByUrl('/tabs')
    console.log('Hello Dickson')
    //this.router.navigateByUrl('/tabs')
    this.loadingCtrl.dismiss();
    this.hideLoader();
    this.modalCtrl.dismiss(data);
    console.log('I am here')
    //this.router.navigateByUrl('/auth-screen')
    this.loadingCtrl.dismiss();
    this.isModalOpen = false;
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
        this.hideLoader();
        this.modalCtrl.dismiss(data);
        this.loadingCtl.dismiss();
        this.isModalOpen = false;
      }

     
    );
  }

}, 2000);
this.loadingCtl.dismiss();
}
//Set and Check pin if correct

sett(number){
this.pin += number;
this.setFocus();

if(this.pin.length == 4){
  this.presentLoading('Validating...', 'crescent')
  this.checkPin()
}
}







}