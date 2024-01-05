import { Component, NO_ERRORS_SCHEMA, OnInit } from '@angular/core';
import { ActionSheetController, AlertController, IonicModule, LoadingController, ModalController, NavController, ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { PreferencesService } from 'src/app/services/storage.service';
import { Clipboard } from '@capacitor/clipboard';
import QRCode from 'qrcode';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-receivesub',
  templateUrl: './receivesub.page.html',
  styleUrls: ['./receivesub.page.scss'],
  standalone:true,
  imports:[
    CommonModule,
    FormsModule,
    IonicModule,
  ],
    schemas:[NO_ERRORS_SCHEMA]
})
export class ReceivesubPage implements OnInit {

  accounts: any[] = [];
  features: any[] = [];
  transactions: any[] = [];

  qrCodeString = 'This is a secret qr code message';
  popoverController: any;
  filterForm: any;
  text: string="";
   qrCodeData: string;
   qrCodeUrl : '';
   qrCodeDataUrl : string;
   userData: any;
   selectedTransaction: any;
  constructor(
    public navCtrl: NavController,
    private authService: AuthService,
    private router: Router,
    private modalController: ModalController,
    private toastController: ToastController,
    private storage: PreferencesService,
    private actionSheetCtrl: ActionSheetController,
  ) { 

 

   
      this.fetchQRCodeData(this.qrCodeData);

  }

  fetchQRCodeData(qrCodeData: string) {
    
    this.authService.getSubQrCode().subscribe(
      (data: any) => {
        if(data.message === "Signature verification failed" && this.router.url !== '/auth-screen'){
          localStorage.removeItem('subUserData');
          localStorage.removeItem('res');
          localStorage.removeItem('accessT');
          this.toastController.create()
          this.presentToast('Session Expired.....Logging out', 'danger');
          this.router.navigateByUrl('/auth-screen');
        }
        else{
          console.log(data);
          
          
          
              this.qrCodeUrl = data;
          
              QRCode.toDataURL(JSON.stringify(this.qrCodeUrl), { errorCorrectionLevel: 'M' }, (err, dataUrl) => {
                if (err) {
                  console.error('Error generating QR code:', err);
                } else {
                  this.qrCodeDataUrl = dataUrl;

                  console.log(this.qrCodeDataUrl);
                }
              });
            }
          
        
       
      },
      (error) => {
        console.error(error);
        console.log('Error Generating QrCode, Check your internet connection and try again or Proceed to use the tag namery!')

      }
    );
  }

 
  ngOnInit() {
    
    const userDataString = localStorage.getItem('subUserData');
    if (userDataString) {
      this.userData = JSON.parse(userDataString);
    }
    this.transactions = [
      { id: 1, to: 'Jahs Will', date: '2022-05-22', amount: 5000 },
      { id: 2, to: 'Aniekan Dickson', date: '2022-03-02', amount: 7000 },
      { id: 3, to: 'Yahayah Hephzibah', date: '2022-07-28', amount: -3250 },
      { id: 4, to: '-Mechatronics 3', date: '2022-01-09', amount: 1000 },
      { id: 5, to: 'Godwin Gheli', date: '2022-04-13', amount: -800 },
    ];
  }

  async logout() {
    const alert = await this.actionSheetCtrl.create({
      header: 'Are you sure you want to Log out?',
      buttons: [
        {
          text: 'Yes',
          handler: () => {
            this.authService.logout();
          }
        },
        {
          text: 'No',
          role: 'cancel'
        }
      ]
    });
  
    await alert.present();


    const { role } = await alert.onWillDismiss();

    return role === 'confirm';
  }
  
// Add these methods to your component class


async openModal(transaction) {
  this.selectedTransaction = transaction;
  const modal = await this.modalController.create({
    component: 'ion-modal',
    cssClass: 'transaction-details-modal',
  });
  modal.present();
}

dismissModal() {
  this.modalController.dismiss();
}


  canDismiss = async () => {
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Are you sure you want to Log out?',
      buttons: [
        {
          text: 'Yes',
          role: 'confirm',
        },
        {
          text: 'No',
          role: 'cancel',
        },
      ],
    });

    actionSheet.present();

    const { role } = await actionSheet.onWillDismiss();

    return role === 'confirm';
  };

  logoutx(){
    this.authService.logout()
      }

  async writeToClipboard(text: string) {
    try {
      await Clipboard.write({
        string: text
      });
      console.log('Text copied to clipboard');
      const toast = await this.toastController.create({
        message: 'Tagname Copied to clipboard ' + text,
        duration: 2000
      });
      toast.present();
    } catch (error) {
      console.error('Error copying text to clipboard: ', error);
      const toast = await this.toastController.create({
        message: 'Could not copy Tagname to clipboard',
        duration: 2000
      });
      toast.present();
    }
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
  

}