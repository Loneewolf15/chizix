import { Component, EnvironmentInjector, HostListener, Optional, ViewChild, inject  } from '@angular/core';

import { AlertController, Platform, ToastController, IonRouterOutlet, ActionSheetController, IonicModule } from '@ionic/angular';
// import { SplashScreen } from '@capacitor/splash-screen';
// import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router } from '@angular/router';
import { InactivityService } from './services/inactivity.service';
import { ToastService } from './services/toast.service';
import { NativeAudio } from '@capacitor-community/native-audio';
import { App } from '@capacitor/app';

import { CommonModule, Location } from '@angular/common';
import { Capacitor } from '@capacitor/core';
import { FcmService } from './services/fcm/fcm.service';
import { ReactiveFormsModule } from '@angular/forms';
import { PreferencesService } from './services/storage.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, ReactiveFormsModule],
})
export class AppComponent {
  tap = 0;
  public environmentInjector = inject(EnvironmentInjector);

  constructor(
    private inactivityService: InactivityService,
    public router:Router,
    private toastService: ToastService,
    private toastController: ToastController,
    private alertController: AlertController,
    private location: Location,
    private platform: Platform,
    private toastCtrl: ToastController,
    private alertCtrl: AlertController,
    private actionSheetCtrl: ActionSheetController,
    private fcm: FcmService,
    private str: PreferencesService,
    @Optional() private routerOutlet?: IonRouterOutlet
  ) {
    this.platform.ready().then(() => {
     // this.fcm.initPush();
       this.exitAppOnAlertx();
       this.str.getToken().subscribe(token=>{
          if(token) {
            this.sendTokenToServer(token);
          }
       });
       
    }).catch(e =>{
      console.log(e)
    });
    // this.initializeApp();

   // this.preloadAudio();
  }

  


exitAppOnAlert() {
  if(Capacitor.getPlatform() == 'android') {
    this.platform.backButton.subscribeWithPriority(10, async() => {
      if (!this.routerOutlet?.canGoBack()) {
        this.exit();
      }
    });
  }
}

sendTokenToServer(token: string) {
  // Replace with your actual server-side code to store the token
  console.log('Device token:', token);
}



exitAppOnAlertx() {
  const platform = Capacitor.getPlatform();
  
  if (platform === 'android') {
    this.platform.backButton.subscribeWithPriority(10, async () => {
      if (this.router.url === '/auth-screen' || this.router.url === '/tabs/home') {
        this.exit();
      } else {
        this.goBack();
      }
    });
  } else if (platform === 'ios') {
    document.addEventListener('swipeback', () => {
      if (this.router.url === '/auth-screen' || this.router.url === '/tabs/home') {
        this.exit();
      } else {
        this.goBack();
      }
    });
  }
}


goBack() {
  this.location.back();
}


exitAppOnDoubleTap() {
  if(Capacitor.getPlatform() == 'android') {
    this.platform.backButton.subscribeWithPriority(10, async() => {
      if (!this.routerOutlet?.canGoBack()) {
          // double tap exit
          this.tap++;
          if(this.tap == 2) App.exitApp();
          else {
            this.doubleTapExitToast();
          }
      }
    });
  }
}


async doubleTapExitToast() {
  console.log('doubletapexit was called!');
  let toast = await this.toastCtrl.create({
    message: 'Tap back button again to exit the App before I\'m gone',
    duration: 3000,
    position: 'bottom',
    color: 'primary'
  });
  toast.present();
  const dismiss = await toast.onDidDismiss();
  if(dismiss) {
    console.log('dismiss: ', dismiss);
    this.tap = 0;
  }
}

async alertExit() {
  console.log('alert');
  const alert = await this.alertCtrl.create({
    header: 'Exit App',
    subHeader: 'Confirm',
    message: 'Are you sure you want to exit the App?',
    buttons: [
      {
        text: 'NO',
        role: 'cancel'
      },
      {
        text: 'YES',
        role: 'confirm',
        handler: () => { App.exitApp(); }
      }
    ],
  });
  alert.present();
}

async exit() {
  const alert = await this.actionSheetCtrl.create({
    header: 'Are you sure you want to Exit the App?',
    buttons: [
      {
        text: 'Yes',
        handler: () => { 
          App.exitApp();
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

ngOnInit() {
  
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
  
  backButtonEvent(){
    this.platform.backButton.subscribeWithPriority(10, ()=>{
      if(!this.routerOutlet.canGoBack()){
        this.backButtonAlert();
      }
      else{
        this.location.back()
      }
    })
  }
  
  async backButtonAlert(){
    const alert = await this.alertController.create({
      message: 'Are you sure you want to exit the Application?',
      buttons: [{
        text: 'Cancel',
        role: 'cancel'
      },{
        text: 'Close App',
        handler: ()=> {
          App.exitApp();
        }
      }]
    });
    await alert.present();
  }
  
  
  @HostListener('document:mousemove') resetInactivityTimer() {
    this.inactivityService.startInactivityTimer().subscribe();
  }


}
