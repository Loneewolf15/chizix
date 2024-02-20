import { Injectable } from '@angular/core';
import { Capacitor } from '@capacitor/core';
import { BehaviorSubject } from 'rxjs';
import { PreferencesService } from '../storage.service';
import { ActionPerformed, PushNotificationSchema, PushNotifications, Token } from '@capacitor/push-notifications';

import { AuthService } from 'src/app/services/auth.service';
import { AlertController } from '@ionic/angular';
export const FCM_TOKEN = 'divine_push_notify'
@Injectable({
  providedIn: 'root'
})
export class FcmService {
private _redirect = new BehaviorSubject<any>(null);

get redirect(){
  return this._redirect.asObservable();
}

  constructor(
    private storage: PreferencesService,
    private authService: AuthService,
    private alertController: AlertController 
  ) { }

  initPush() {
    if (Capacitor.getPlatform() !== 'web') {
      this.registerPush();
    }
  }

  
private async registerPush(){
  try{
    await this.addListener();
    let permStatus = await PushNotifications.checkPermissions();

    if (permStatus.receive === 'prompt' || permStatus.receive !== 'granted') {
      permStatus = await PushNotifications.requestPermissions();
    }
  
    if (permStatus.receive !== 'granted') {
      throw new Error('User denied permissions!');
    }
  
    await PushNotifications.register();
  } catch(e){
    console.log(e)
  }
}

async getDeliveredNotifications(){
  const notificationList = await PushNotifications.getDeliveredNotifications();
  console.log('delivered notifications', notificationList);
}


addListener(){
  PushNotifications.addListener(
    'registration',
    async(token: Token) => {
      console.log('This token', token);
      const fcm_token = (token?.value);
      this.sendTokenToServer(token.value);
      //this.showTokenAlert(token.value); 
      let gp = 1;
      const saved_token = JSON.parse((await this.storage.getStoragex(FCM_TOKEN)).value);
      if(saved_token){
        if(fcm_token == saved_token){
          console.log('samesy');
          gp = 0;
        } else{
          gp = 2;
        }
      }
      if(gp == 1){
        this.storage.setStorage(FCM_TOKEN, JSON.stringify(fcm_token));
      } else if(gp == 2){
        //update tokens
        const data = {
          expired_token: saved_token,
          renewed_token: fcm_token,
        };
        this.storage.setStorage(FCM_TOKEN, fcm_token)
      }
    }
  );
    PushNotifications.addListener('registrationError', (error: any) =>{
      console.log('Errors' + JSON.stringify(error));
    });
    
    PushNotifications.addListener('pushNotificationReceived', async(notification: PushNotificationSchema) =>{
      console.log('Push Received' + JSON.stringify(notification));
      const data = notification?.data;
      if(data?.redirect) this._redirect.next(data?.redirect)
    });

    PushNotifications.addListener('pushNotificationActionPerformed', async(notification: ActionPerformed) =>{
      const data = notification.notification.data;
      console.log('Errors' + JSON.stringify(notification.notification));
      console.log('Push data', data)
      if(data?.redirect) this._redirect.next(data?.redirect)
    });

}

async removeFcmToken(){
  try{
    const saved_token = JSON.parse((await this.storage.getStoragex(FCM_TOKEN)).value);
    this.storage.removeStorage(saved_token);
  } catch(e){
    console.log(e);
    throw(e);
  }
}


sendTokenToServer(token: string) {
  // Replace with your actual server-side code to store the token
 // this.showTokenAlert("res")
//const fcmtoken = token
const options = {
  fcmtoken: token
}

//this.showTokenAlert(options+ "hi");
  this.authService.storePushToken(options).subscribe(
    (res: any) => {
      console.log(token + "in sub");
      console.log(token + "Divine");
      console.log(res);
      //this.showTokenAlert(res)
      if (res.message === "Token successfully updated") {
      //  this.showTokenAlert("Hello1"+ options); 
      } else {
        //this.presentToast('File upload failed.')
       // this.showTokenAlert("Hello2"); 
      }
    },
    (error) => {
      console.log(error);
      //this.presentToast('An error occurred during the upload.');
    }
  );
  console.log("Device token:", token);
}



async showTokenAlert(token: string) {
  const alert = await this.alertController.create({
    header: 'Device Token',
    message: token,
    buttons: ['OK']
  });

  await alert.present();
}





}
