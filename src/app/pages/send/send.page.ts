import { CommonModule } from '@angular/common';
import { OnDestroy, Component, OnInit, ViewChild, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormBuilder, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { BarcodeScanner, ScanResult } from '@capacitor-community/barcode-scanner';
import { AlertController, IonicModule, LoadingController, ModalController, ToastController } from '@ionic/angular';
import { IonText } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { PreferencesService } from 'src/app/services/storage.service';
import { ToastService } from 'src/app/services/toast.service';
import { TransactionStatusComponent } from 'src/app/transaction-status/transaction-status.component';
@Component({
  selector: 'app-send',
  templateUrl: './send.page.html',
  styleUrls: ['./send.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
  ],
  schemas: [NO_ERRORS_SCHEMA],
})
export class SendPage implements OnInit, OnDestroy {
  // @ViewChild('inputField') inputField: any;
  @ViewChild('selectedTagText', { static: true }) selectedTagText: IonText;
  selectedTag: any;
  header: any;
  status: any;
  message: any;
  scanActive: boolean = false;
  inputField: any;
  accounts: any[] = [];
   results: any[] = []
  transactions: any[] = [];
  isModalOpen = false;
  qrCodeString = 'This is a secret qr code message';
  popoverController: any;
  filterForm: any;
  scannedResult: any;
  content_visibility = '';
  amount: string = "";
  filteredTags: any[] = []; // initialize filteredTags array
  searchTerm: any = ''; // initialize searchTerm variable
userData: any;
pin: any = "";
isLoading = false;
type = true;
userImage: any;
getBalance: any;
  showBalance = false;
 
  formattedPrice: string;
  
tagName: any[] = [];
tagNamex: any = [];

  setOpen(isOpen: boolean) {
    if(this.router.url !== '/send'){
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

 
  ngOnInit() {
  //  BarcodeScanner.prepare();
    //this.setFocux();
   
  const userDataString = localStorage.getItem('userData');
  if (userDataString) {
    this.userData = JSON.parse(userDataString);
  }
this.getImage();
  //this.setFocus();
  this.balance();
  this.getTagname();
  this.getRecentReceiver();
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


onTagSelect(tag: any) {
  this.selectedTag = tag;
  console.log(tag.full_name);
  console.log("userSelected" + tag.full_name + tag.user_tag)
  this.modalController.dismiss();
}

///filter the tagname on search here 

filterTag() {
  console.log(this.filteredTags);
  if (!Array.isArray(this.tagName)) {
    return; // handle error condition
  }

  // Check if the length of the searchTerm is at least 4 characters
  if (this.searchTerm.length >= 4) {
    this.filteredTags = this.tagName.filter(
      (tag) =>
       // tag.full_name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        tag.user_tag.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  } else {
    // If the length is less than 4, reset the filteredTags array
    this.filteredTags = [];
  }
}


search(event) {
  const query = event.detail.value;
  console.log(query)
  if (query !== '') {
    this.filteredTags = this.tagName.filter(tag => tag.includes(query));
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


getRecentReceiver(){
  this.authService.getRecent().subscribe(
    (response: any) => {
      if(response.message === "Signature verification failed" && this.router.url !== '/auth-screen' && this.router.url === '/send'){
        localStorage.removeItem('userData');
        localStorage.removeItem('res');
        localStorage.removeItem('accessT');
        this.toastController.create()
        this.presentToast('Session Expired.....Logging out', 'danger');
        this.router.navigateByUrl('/auth-screen');
      }
      else{
        console.log(response);
        //logic goes here 
        for(let res of response){
          console.log(res.full_name);
        }

        // other operations
      }
    },
    (error) => {
      if(this.router.url === '/send'){
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
  return true;
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
    if (this.router.url !== '/send') {
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

ngOnDestroy(): void {
  this.stopScan();
}


  // //change style of current input
  // setFocused(){
  //   for (let i = 1; i < 3; i++){
  //     if((this.amount.length + 1) == i){
  //       document.getElementById("amount" + i).style.background = "var(--ion-color-base)"
  //     }
  //   else {
  //     document.getElementById("amount" + i).style.background = "var(--ion-color-base)"
  //   }
  // }
  // }


  set(value: any) {
    console.log(value)   

     this.amount += value;
  }
  


clear(){
  this.inputField.value= "";
//  this.setFocux();
}

//backspace last amount and focus on input
back(){
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
  // let subHeader : string;

  switch (status) {
    case 'Transaction successful':
      message = `Successfully sent ${amount} to Velux user @${this.selectedTag.user_tag}.`;
      // subHeader = 'Transaction SuccessFul'
      imgSrc = 'assets/images/success-img.png';
      break;
    case 'insufficient fund':
      message = `Your request to send ₦${amount} to @${this.selectedTag.user_tag} could not be completed due to insufficient funds in your account.`;
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
    tagname: this.selectedTag.user_tag
   }

   console.log(sendData)
   
   this.authService.payVeluxite(sendData).subscribe(
    (data: any) => {
      console.log(JSON.stringify(data))
      console.log(data.message)
      if(data.message === "Signature verification failed" && this.router.url !== '/auth-screen' && this.router.url === '/send'){
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
        } else if(data.message === 'the amount is too small '){
          
          this.toastController.create()
          this.presentToast(data.message, 'danger');
          this.presentSendAlert('failed', ` ₦${sendData.amount}`, 'Transaction Failed');
          console.log('Cameth hereAmount');
          
        //  this.router.navigateByUrl('/tabs')
          this.loadingCtrl.dismiss();
        }
        
        else if(data.message === 'Transaction successful'){

          this.toastController.create()
          this.presentToast(data.message, 'success');
          this.presentSendAlert('Transaction successful', ` ₦${sendData.amount}`, 'Transaction Successful');
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



book(){
  this.router.navigateByUrl('/bat')
}





}