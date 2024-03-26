import { Component, Input, NO_ERRORS_SCHEMA, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import {  ModalController, AnimationController, LoadingController, ToastController, AlertController, IonicModule } from '@ionic/angular'
import { finalize } from 'rxjs/operators';
import { ToastService } from '../services/toast.service';
import { TransactionStatusComponent } from 'src/app/transaction-status/transaction-status.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-cwithdraw-modal',
  templateUrl: './cwithdraw-modal.component.html',
  styleUrls: ['./cwithdraw-modal.component.scss'],
  standalone:true,
  imports:[
    CommonModule,
    FormsModule,
    IonicModule,
  ],
    schemas:[NO_ERRORS_SCHEMA],
})
export class CwithdrawModalComponent implements OnInit {
 // @ViewChild('modalx') modalx: IonModal;
 @Input() accountName: string;
 @Input() accountNumber: string;
 @Input() amount: number;
 @Input() description: string;
 @Input() bankName: string;
 @Input() bankCode: string;
 @Input() formData: any;
 @Input() showGoBackButton: boolean;
 header: any;
 isModalOpen = false;
 pin: any = "";
 status: any;
 content_visibility = '';
 message: any;
isLoading = false;
 userImage: any;

  constructor(private router: Router,
    private modalController: ModalController,
    private loadingCtl: LoadingController,
    private toastController: ToastController,
    private modalCtrl: ModalController,
    private toastCtrl: ToastController,
    private animationCtrl: AnimationController,
    private authService: AuthService,
    private toastService: ToastService,
    private alertController : AlertController,
    ) {
    
  }

  ngOnInit(
   
  ) {

this.getImage();
  }

  getImage() {
    const storedImage = localStorage.getItem('userImage');
    if (storedImage) {
      this.userImage = JSON.parse(storedImage);
    }
    }

  yes() {
    this.modalController.dismiss();
    this.router.navigateByUrl('/register/veri')
  }
  Close() {
    this.modalController.dismiss();
  }


setOpenx(isOpen: boolean) {
  console.log('Here')
  if(this.router.url !== '/withdrawal'){
    this.isModalOpen = false;
  }
  else{
    this.isModalOpen = isOpen;
  this.pin = "";
  this.setFocus();
  }

}

closeModal() {
  this.setOpenx(false);
}


  enterAnimation = (baseEl: HTMLElement) => {
    const root = baseEl.shadowRoot;

    const backdropAnimation = this.animationCtrl
      .create()
      .addElement(root.querySelector('ion-backdrop')!)
      .fromTo('opacity', '0', 'var(--backdrop-opacity)');

    const wrapperAnimation = this.animationCtrl
      .create()
      .addElement(root.querySelector('.modal-wrapper')!)
      .keyframes([
        { offset: 0, opacity: '0', transform: 'scale(0)' },
        { offset: 1, opacity: '1.0', transform: 'scale(1)' },
      ]);

    return this.animationCtrl
      .create()
      .addElement(baseEl)
      .easing('ease-out')
      .duration(500)
      .addAnimation([backdropAnimation, wrapperAnimation]);
  };

  leaveAnimation = (baseEl: HTMLElement) => {
    return this.enterAnimation(baseEl).direction('reverse');
  };

  async presentToast(message: string, color: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      position: 'bottom',
      color: color
    });
    toast.present();
  }

  async presentLoading( message: string, spinnerx: any){
    const loading = await this.loadingCtl.create({
      message: message,
      spinner: spinnerx
    });
    await loading.present();
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


sett(number){
  this.pin += number;
  this.setFocus();
  
  if(this.pin.length == 4){
  this.presentLoading('Validating...', 'crescent')
  this.checkPin()
  }
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
  

  async presentWithdrawalAlert(status: string,  amount: any, title?: string, subtitle?: string) {
    let message: string;
    let imgSrc: string;
    switch (status) {
      case 'successful':
        message = `You have successfully sent ${amount} to ${this.accountName}.`;
        imgSrc = 'assets/imgs/success.png';
        break;
      case 'insuficient funds':
        message = `Your request to withdraw ${amount}  could not be completed due to insufficient funds in your account.`;
        imgSrc = 'assets/imgs/failed.png';
        break;
      case 'failed':
        message = `Please enter an amount greater than ₦50.`;
        imgSrc = 'assets/imgs/failed.png';
        break;
        case 'failedT':
        message = 'An unknown error occurred!! Please try again later';
        imgSrc = 'assets/imgs/failed.png';
        break;
        case 'error':
          message = 'The transfer to the bank account must be under the same name as the registered user\'s full name.';
          imgSrc = 'assets/imgs/failed.png';
          break;        
      default:
        message = 'An unknown error occurred!! ${<br>} Please try again later';
        imgSrc = 'assets/imgs/failed.png';
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
  



hideLoader() {
  if(this.isLoading) this.isLoading = false;
  return this.loadingCtl.dismiss()
  .then(() => console.log('dismissed'))
  .catch(e => console.log(e));
  }
 async confirmWithdrawal(){

    const FormData = {
      amount: this.amount,
      bank_code: this.bankCode,
      bank_name: this.bankName,
      payfor: this.description,
      account: this.accountNumber,
      accountName: this.accountName,
    }
    this.presentLoading('Processing Withdrawal...', 'circular')

    this.authService.withdraw(FormData)
    .pipe(
      finalize(() => {
        this.loadingCtl.dismiss();
        this.modalCtrl.dismiss();
      })
  ).subscribe(
      (response: any) => {
        console.log(response.message);
          if(response.message === "Signature verification failed" && this.router.url !== '/auth-screen'){
            this.toastController.create()
            this.presentToast('Session Expired.....Logging out', 'danger');
            this.router.navigateByUrl('/auth-screen');
          }
        else{
        console.log('Processing Request', response);

       console.log('here');
       if(response.message === 'insuficient funds'){
         console.log('Hello mate'+ response.message)
         this.toastController.create()
         this.presentToast(response.message + ', Please fund your account and try again', 'danger');
        this.presentWithdrawalAlert(response.message, ` ₦${FormData.amount}`, 'Incomplete Transaction');
         this.loadingCtl.dismiss();
         this.modalCtrl.dismiss();
       } else if(response.message === 'the amount is too small '){
         
         this.toastController.create()
         this.presentToast(response.message, 'danger');
         this.presentWithdrawalAlert('failed', ` ₦${FormData.amount}`, 'Transaction Failed');
         console.log('Cameth hereAmount');
         this.loadingCtl.dismiss();
         this.modalCtrl.dismiss();
       }
       else if(response.message === "bank name dosn't match"){

        this.toastController.create()
      //  this.presentToast(response.message, 'success');
        this.presentWithdrawalAlert('error', ` ₦${FormData.amount}`, 'Bank Name');
        console.log('Cameth here');
        this.loadingCtl.dismiss();
        this.modalCtrl.dismiss();
      } 
       else if(response.message === "Transaction successful"){

         this.toastController.create()
         this.presentToast(response.message, 'success');
         this.presentWithdrawalAlert('successful', ` ₦${FormData.amount}`, 'Transaction Successful');
         console.log('Cameth here');
         this.loadingCtl.dismiss();
       } else if(response.message === "Transaction Failed"){
         this.toastController.create()
         this.presentWithdrawalAlert('failedT', ` ₦${FormData.amount}`, 'Transaction Failed');
         this.presentToast(response.message, 'danger');
         this.router.navigateByUrl('/tabs')
         this.loadingCtl.dismiss();
         this.modalCtrl.dismiss();
       }
       console.log('I reach here')
       this.loadingCtl.dismiss();
       }
      },
      (error) => {
        if(this.router.url === '/withdrawal'){
             console.error('Could not complete your request try again!', error)
        this.toastService.showToast('Could not complete your request try again!')
        }
     
      }
    );
    this.loadingCtl.dismiss();
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
          //  this.presentLoading('Processing...', 'circular')
            this.isModalOpen = false;
          this.confirmWithdrawal()
          //this.router.navigateByUrl('/auth-screen')
          this.loadingCtl.dismiss();
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
            this.loadingCtl.dismiss();
            this.hideLoader();
            this.modalCtrl.dismiss(data);
            console.log('I am here')
            //this.router.navigateByUrl('/auth-screen')
            this.loadingCtl.dismiss();
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

      }
 
