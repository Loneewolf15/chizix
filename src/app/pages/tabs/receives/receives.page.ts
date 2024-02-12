import { Component, NO_ERRORS_SCHEMA, OnInit } from '@angular/core';
import { AlertController, LoadingController, ModalController, NavController, ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { HttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { PreferencesService } from 'src/app/services/storage.service';
import { ToastService } from 'src/app/services/toast.service';
import { Clipboard } from '@capacitor/clipboard';
import { Capacitor, Plugins } from '@capacitor/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

 const { Clipboardx } = Plugins;
if (Capacitor.isPluginAvailable('Clipboard')) {
  const { Clipboardx } = Plugins;
}
import QRCode from 'qrcode';

@Component({
  selector: 'app-receives',
  templateUrl: './receives.page.html',
  styleUrls: ['./receives.page.scss'],
  standalone: true,
  imports:[
    CommonModule,
    FormsModule,
    IonicModule,
  ],
    schemas:[NO_ERRORS_SCHEMA]
})
export class ReceivesPage implements OnInit {
text: string="";
  qrCodeString = 'This is a secret qr code message';
   qrCodeData: string;
   qrCodeUrl : '';
   qrCodeDataUrl : string;
   userData: any;
  
  constructor(
    public navCtrl: NavController,
    private authService: AuthService,
    private http: HttpClient,
    private loadingCtrl: LoadingController,
    private loadingController: LoadingController,
    private formBuilder: FormBuilder,
    private router: Router,
    private modalCtrl: ModalController,
    private modalController: ModalController,
    private toastCtrl: ToastController,
    private toastController: ToastController,
    private storage: PreferencesService,
    //private clipboard: Clipboard,
    private toastService: ToastService,
    private alertController : AlertController,
  ) { 

 

   
      this.fetchQRCodeData(this.qrCodeData);

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

  copied(value: string){
    Clipboardx['write']({
      string: value
    }).then(()=>{
      alert('Text copied');
      value = "";
    })
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


async copyT(text: string) {
  try {
    await Clipboardx['write']({
      string: text
    });
    console.log('Text copied to clipboard');
    const toast = await this.toastController.create({
      message: 'Tagname Copied to clipboard',
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



  fetchQRCodeData(qrCodeData: string) {
    
    this.authService.getQrCode().subscribe(
      (data: any) => {
        if(data.message === "Signature verification failed" && this.router.url !== '/auth-screen'){
          localStorage.removeItem('userData');
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

    const userDataString = localStorage.getItem('userData');
    if (userDataString) {
      this.userData = JSON.parse(userDataString);
    }

    // this.authService.getQrCode(this.qrCodeData).subscribe(data => {
    //   this.qrData = data['qrcode'];
    // });

      // this.http.get('http://veluxpay.com/scans/generateQrcode').subscribe(data => {
      //   this.qrCodeData = data['qrcode'];
      // });
   
    
  }
  
}
