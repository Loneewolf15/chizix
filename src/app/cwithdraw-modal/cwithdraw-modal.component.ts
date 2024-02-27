import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import {  ModalController, AnimationController, LoadingController, ToastController, AlertController } from '@ionic/angular'
import { finalize } from 'rxjs/operators';
import { ToastService } from '../services/toast.service';
import { TransactionStatusComponent } from 'src/app/transaction-status/transaction-status.component';
@Component({
  selector: 'app-cwithdraw-modal',
  templateUrl: './cwithdraw-modal.component.html',
  styleUrls: ['./cwithdraw-modal.component.scss'],
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
 status: any;
 message: any;

  constructor(private router: Router,
    private modalController: ModalController,
    private loadingCtl: LoadingController,
    private toastController: ToastController,
    private animationCtrl: AnimationController,
    private authService: AuthService,
    private toastService: ToastService,
    private alertController : AlertController,
    ) {
    
  }

  ngOnInit(
   
  ) {}

  yes() {
    this.modalController.dismiss();
    this.router.navigateByUrl('/register/veri')
  }
  Close() {
    this.modalController.dismiss();
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
       } else if(response.message === 'the amount is too small '){
         
         this.toastController.create()
         this.presentToast(response.message, 'danger');
         this.presentWithdrawalAlert('failed', ` ₦${FormData.amount}`, 'Transaction Failed');
         console.log('Cameth hereAmount');
         this.loadingCtl.dismiss();
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

      }
 
