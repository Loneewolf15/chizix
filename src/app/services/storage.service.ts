import { Injectable } from '@angular/core';

//import { Plugins } from '@capacitor/core';

import { Preferences } from '@capacitor/preferences';

import {from, Observable} from 'rxjs'

export const INTRO_KEY = 'intro-card';
export const APP_TOKEN = 'app-token'

@Injectable({
  providedIn: 'root'
})
export class PreferencesService {
  set: any;

  constructor() { }

  setPreference(key, value) {
    return Preferences.set({
      key,
      value
    });
  }
///fcm 
setStorage(key: string, value: any) {
  return Preferences.set({
    key,
    value
  });
}

  getPreference(key) {
    return Preferences.get({key});
  }
  // removePreference(key) {
  //   return Preferences.remove({key})
  // }
//fcm
getStoragex(key:string):any {
  return Preferences.get({key});
}
  removeStorage(key: string):any {
    return Preferences.remove({key: key})
  }
  //fcm
  getToken(): Observable<any>{
    return from(this.getStoragex(APP_TOKEN))
  }
  
  clearStorage(){
    Preferences.clear
  }

  async store(storageKey: string, value: any) {

    const encryptedValue = btoa(encodeURI(JSON.stringify(value)));
    await Preferences.set({
      key: storageKey,
      value: encryptedValue,
    });
  }

  async get(storageKey: string){

    const ret = await Preferences.get({
      key: storageKey
    });
    if(ret.value){
      return JSON.parse(decodeURI(atob(ret.value)));
    } else {

      return false;
    }
  }

  async removeItem(storageKey: string){
    await Preferences.remove({
      key: storageKey
    });
  }

  async clearItem(){

    await Preferences.clear()
  }

}
