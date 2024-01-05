import { AfterContentChecked, CUSTOM_ELEMENTS_SCHEMA, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {  LoadingController, Platform, AnimationController, ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { PreferencesService } from 'src/app/services/storage.service';
import { ToastService } from 'src/app/services/toast.service';
import { IonicModule, IonicSlides } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { HttpClient } from '@angular/common/http';
import { finalize } from 'rxjs/operators';
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { CommonModule, DatePipe } from '@angular/common';


const IMAGE_DIR = 'stored-images';

export interface LocalFile {
  name: string;
  path: string;
  data: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone:true,
  imports: [IonicModule, CommonModule],
  providers: [DatePipe],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HomePage implements OnInit {
swiperModules = [IonicSlides];
  isAccountBalanceVisible: boolean = true;
  greeting: string;
  accounts: any[] = [];
  features: any[] = [];
  transactions: any[] = [];
  transactionx: any[] = [];
  displayUserData: any;
  type = true;
  userData: any;
  userImage: any;
  getBalance: any;
  showBalance = false;
  selectedTransaction: any;
  isModalOpen = false;
  getBalancex: any[] = [];
  formattedPrice: any;
  images: LocalFile[] = [];
  constructor(
    private authService: AuthService,
    public router : Router,
    private toastController: ToastController,
    private storage: PreferencesService,
    private toastService: ToastService,
    private datePipe: DatePipe,
    private animationCtrl: AnimationController,
    private alertController: AlertController,
    private plt: Platform,
    private http: HttpClient,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
   
  ) { 

    // const now = new Date();
    // const currentHour = this.datePipe.transform(now, 'HH');

    // if (currentHour < '12') {
    //   this.greeting = 'Good morning! \u{1F600}';
    // } else {
    //   this.greeting = 'Good afternoon/evening! \u{1F44B}';
    // }
  
    const now = new Date();
    const currentHour = Number(this.datePipe.transform(now, 'HH'));

    if (currentHour < 12) {
      this.greeting = 'Good morning! \u{1F600}'; // Add smiley face emoji
    } else if (currentHour <= 16) {
      this.greeting = 'Good afternoon! \u{1F44B}'; // Add waving hand emoji
    } else {
      this.greeting = 'Good evening! \u{1F319}'; // Add crescent moon emoji
    }
  

    setTimeout(() => {
      this.getTransactions();
       this.fetchBalance();
      this.fetchUserData();
      this.getImage();
    }, 1000);
    
    // run the loop every 45 seconds
    setInterval(() => {
      this.fetchUserData();
    }, 450000);

    setInterval(() => {
      this.fetchBalance();
      this.getTransactions();
    }, 70000);
   
  }





  receive(){
    this.router.navigateByUrl('/tabs/receive')
  }

  send(){
    this.router.navigateByUrl('/deposit')
  }

  visibility(){
    
      this.isAccountBalanceVisible = !this.isAccountBalanceVisible;
    
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


  formatPrice(getBalance: number): string {
    return getBalance.toLocaleString();
  }

      formatAmount(transactionx: any) {
    return transactionx.amount.toLocaleString();
      }

  fetchBalance(){
    this.authService.getAccountBalance().subscribe((res: any) => {
      //this.displayUserData = res;
      
      if(res.message === "Signature verification failed" && this.router.url !== '/auth-screen'){
        localStorage.removeItem('userData');
        localStorage.removeItem('res');
        localStorage.removeItem('accessT');
        this.toastController.create()
        this.presentToast('Session Expired.....Logging out', 'danger');
        this.router.navigateByUrl('/auth-screen');
      }
            else{
      this.getBalance = res;
      //console.log(res)
      this.formattedPrice = this.formatPrice(this.getBalance);
      localStorage.setItem('balance', JSON.stringify(this.formattedPrice));
    
            }
  })
  }
fetchUserData(){
  const userDataString = localStorage.getItem('userData');
  if (userDataString) {
    this.userData = JSON.parse(userDataString);
  }
}

getImage() {
  this.authService.getUserImage().subscribe((res: any) => {
    
    if (res.message === "Signature verification failed" && this.router.url !== '/auth-screen') {
      localStorage.removeItem('userData');
      localStorage.removeItem('res');
      localStorage.removeItem('accessT');
      this.toastController.create();
      this.presentToast('Session Expired.....Logging out', 'danger');
      this.router.navigateByUrl('/auth-screen');
    } else {
      this.userImage = res.image;

      // Store the response in local storage
      localStorage.setItem('userImage', JSON.stringify(res.image));
    }
  });
}


getTransactions() {
  this.authService.getTransactions().subscribe((res: any) => {
 
    if (res.message === "Signature verification failed" && this.router.url !== '/auth-screen') {
      localStorage.removeItem('userData');
      localStorage.removeItem('res');
      localStorage.removeItem('accessT');
      this.toastController.create();
      this.presentToast('Session Expired.....Logging out', 'danger');
      this.router.navigateByUrl('/auth-screen');
    } else {
      
      
      // const mergedArray = [...res.inapp, ...res.vtu, ...res.deposit, ...res.withdrawal];
      // console.log(mergedArray);

      this.transactionx = res;
      }
      
      console.log(this.transactionx);
    
  });
}


// Helper function to format amount with commas
formatAmountWithCommas(amount: number): string {
  return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}




toggleBalance() {
  this.showBalance = !this.showBalance;
}


changeType() {
  this.showBalance = !this.showBalance;
}

  ngOnInit() {
    
  


  


this.authService.userData$.subscribe((res: any) => {
  this.displayUserData = res;
 
})




    
  }


  featureClick1(){
    this.router.navigateByUrl("/send");
  }
  
  featureClick2(){
    this.router.navigateByUrl("/tabs/receive");
  }



  setOpen(transaction: any) {
    this.selectedTransaction = transaction;
    this.isModalOpen = true;

    // Send response to the frontend
    // console.log('Transaction selected:', transaction);
  }

  closeModal() {
    this.isModalOpen = false;
  }


  ////////////////////Animation was done here//////////////////////////

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


  ////////////////////Animation ends here//////////////////////////

}

