import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, IonInput, LoadingController, NavController, ToastController } from '@ionic/angular';
// import { Storage } from '@ionic/storage';
import { PreferencesService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-transaction-pin',
  templateUrl: './transaction-pin.page.html',
  styleUrls: ['./transaction-pin.page.scss'],
})
export class TransactionPinPage implements OnInit {
pin: string = "";
constructor(
  public loadingCtl : LoadingController,
  public toastCtl : ToastController,
  
){}
  ngOnInit() {
    //set focus on page load
    this.setFocus();
  }

  //change style of current input
  setFocus(){
    for (let i = 1; i <= 6; i++){
      if((this.pin.length + 1) == i){
        document.getElementById("pin" + i).style.background = "var(--ion-color-dark)"
      }
    else {
      document.getElementById("pin" + i).style.background = "var(--ion-color-dark)"
    }
  }
  }

  //clear the Pin and focus on first input box
  clear(){
    this.pin = "";
    this.setFocus();
  }

  //backspace last pin and focus on input
  back(){
    this.pin = this.pin.slice(0, -1);
    this.setFocus();
  }


  //Loader
  async presentLoading(){
      const loading = await this.loadingCtl.create({
        message: 'Checking and storing pin',
        spinner: 'circular'
      });
      await loading.present();
  }
  //Toast
  async presentToast(message, color){
const toast = await this.toastCtl.create({
  message : message,
  color: color,
  duration: 10000,
  position: "middle",

});
toast.present();
  }

  //check and store pin
  checkPin(){
    setTimeout(()=>{
      this.loadingCtl.dismiss();
      if(this.pin === "1206"){
        this.presentToast("Pin found", "success");
      } else {
this.presentToast("Pin not found", "danger");
      }
    }, 2000);
  }
  //Set and Check pin if correct

  set(number){
    this.pin += number;
    this.setFocus();
    
    if(this.pin.length == 4){
      this.presentLoading();
      this.checkPin()
    }
  }

}


 

