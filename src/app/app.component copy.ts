import { Component, HostListener, ViewChild  } from '@angular/core';

import { AlertController, Platform, ToastController, IonRouterOutlet } from '@ionic/angular';
//import { Plugins } from '@capacitor/core';
//import { SplashScreen } from '@capacitor/splash-screen';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router } from '@angular/router';
import { InactivityService } from './services/inactivity.service';
import { ToastService } from './services/toast.service';
import { App } from '@capacitor/app';

import { Location } from '@angular/common';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
@ViewChild(IonRouterOutlet, { static: true }) routerOutlet: IonRouterOutlet;
  lastBackPressTime = 0;

  constructor(
    private platform: Platform,
    private statusBar: StatusBar,
    private inactivityService: InactivityService,
    public router:Router,
    private toastService: ToastService,
    private toastController: ToastController,
    private splashScreen: SplashScreen,
    private alertController: AlertController,
    private location: Location,
    routerOutlet: IonRouterOutlet,
   
  ) {
    //this.router.navigateByUrl('splash');
    this.initializeApp();
     //SplashScreen.hide();
    //  setTimeout(() => {
    //   this.router.navigateByUrl('splash');
    // }, 20000); // 30 seconds in milliseconds
  }

  ngOnInit() {
    //this.splashScreen.hide();
    // if (Capacitor.isPluginAvailable('SplashScreen')) {
    //     SplashScreen.hide();
    // }

   
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
  
  ionViewDidEnter() {
    if (this.router.url === 'auth-screen' || 'tabs/home') {
      this.platform.backButton.subscribeWithPriority(-1, () => {
        const currentTime = new Date().getTime();
        if (currentTime - this.lastBackPressTime < 2000) {
          App.exitApp(); // exit the application
        } else {
          this.lastBackPressTime = currentTime;
          // show toast or other message to inform the user to press back again to exit
          this.toastController.create()
          this.presentToast('Exiting Application', 'danger');
        }
      });
    }
  }
  

  // async ngOnInit() {
  //   const { SplashScreen } = Plugins;
  //   await SplashScreen.hide();
  // }
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
          navigator['app'].exitApp();
        }

      }
    ]

    });
    await alert.present();
  }
  
  
  @HostListener('document:mousemove') resetInactivityTimer() {
    this.inactivityService.startInactivityTimer().subscribe();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.router.navigateByUrl('/splash');
    });

    
  }
}
