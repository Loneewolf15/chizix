import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { AlertController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import {  ModalController } from '@ionic/angular';
import { LoadingController, Platform, ToastController } from '@ionic/angular';

import { LoginStatusComponent } from 'src/app/login-status/login-status.component';
import { Preferences } from '@capacitor/preferences';
import { PreferencesService } from 'src/app/services/storage.service';



const IMAGE_DIR = 'stored-images';

export interface LocalFile {
  name: string;
  path: string;
  data: string;
}
@Component({
  selector: 'app-profiles',
  templateUrl: './profiles.page.html',
  styleUrls: ['./profiles.page.scss'],
  standalone: true,
  imports: [  CommonModule, FormsModule, IonicModule],
})
export class ProfilesPage implements OnInit {
  userData: any;
  images: LocalFile[] = [];
  userImage: any;
  header: any;
  status: any;
  message: any;
  isToggled = false;
  darkMode = true;
  constructor(
    private alertController: AlertController,
    public router: Router,
    private plt: Platform,
    private http: HttpClient,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private preferences: PreferencesService,
    private modalController: ModalController,
    private toastController: ToastController,
    private authService: AuthService,
  ) { }


  
  goToLogin(){
    this.presentLogout('Logging out');
        
    this.router.navigateByUrl('/auth-screen')
  }




async presentLogout(status: string,) {
  let message: string;
  let imgSrc: string;
  // let subHeader : string;

  switch (status) {
    case 'Logging out':
      message = `Are you sure you want to sign out?`;
      // subHeader = 'Transaction SuccessFul'
      imgSrc = 'assets/images/signout.png';
      break;
   
    default:
      message = 'Are you sure you want to sign out?';
      imgSrc = 'assets/imgs/signout.png';
      break;
  }

 
  //this.status = status || 'Unknown';
 
  this.message = message;
  

  const modal = await this.modalController.create({
    component: LoginStatusComponent,
    
    componentProps: {
     
      message: this.message,
      imgSrc: imgSrc,
      
    },
    cssClass: 'transaction-modal',
  });

  await modal.present();
}
  ngOnInit() {
    this.checkAppMode();
    // this.authService.fetchUserDataFromStorage().subscribe((userData: any) => {
    //   this.userData = userData;
    //   console.log(userData)
    // })
    
    const userDataString = localStorage.getItem('userData');
    if (userDataString) {
      this.userData = JSON.parse(userDataString);
    }
  this.getImage();

    

  }

  async checkAppMode() {
    const checkIsDarkMode = await Preferences.get({key: 'darkModeActivated'});
    console.log(checkIsDarkMode);
    checkIsDarkMode?.value == 'true'
      ? (this.darkMode = true)
      : (this.darkMode = false);
    document.body.classList.toggle('dark', this.darkMode);
  }

  toggleDarkMode() {
    this.darkMode = !this.darkMode;
    document.body.classList.toggle('dark', this.darkMode);
    if(this.darkMode) {
      Preferences.set({key: 'darkModeActivated', value: 'true'}); 
      localStorage.setItem('darkMode', 'true')
    } else {
      
      Preferences.set({key: 'darkModeActivated', value: 'false'});
      localStorage.setItem('darkMode', 'false')
    }
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


  

  async onRemove(){
    
    this.router.navigateByUrl('/auth-screen', {replaceUrl: true});    
    return true;
  }
  logout(){
    //this.authService.logout()
    this.presentLogout('Logging out');
      }

      verifications(){
        this.router.navigateByUrl('/accounts/verification')
      }
      subAccount(){
        // this.presentAlertx()
        ////this.presentAlertx('Sub Account', 'Coming Soon');
        this.router.navigateByUrl('/subaccount')
      }

      account(){
        this.router.navigateByUrl('profiles/accounts')
      }

      security(){
        this.router.navigateByUrl('profiles/security')
      }
      history(){
        this.router.navigateByUrl('/transactions')
      }


      settings(){
        this.router.navigateByUrl('profiles/settings')
      }

      help(){
        this.router.navigateByUrl('profiles/help')
      }

}
