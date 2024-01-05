import { Injectable } from '@angular/core';
import { Capacitor } from '@capacitor/core';
import { BehaviorSubject } from 'rxjs';
import { PreferencesService } from '../storage.service';
import { ActionPerformed, PushNotificationSchema, PushNotifications, Token } from '@capacitor/push-notifications';

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











}
