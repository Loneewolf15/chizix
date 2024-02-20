import { CommonModule } from '@angular/common';
import { Component, NO_ERRORS_SCHEMA, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IonicModule, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-lock',
  templateUrl: './lock.page.html',
  styleUrls: ['./lock.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
  ],
  schemas: [NO_ERRORS_SCHEMA]
})
export class LockPage implements OnInit {

userData: any;
pin: any = "";
userImage: any;

  constructor(
    public router:Router,
    public loadingCtl : LoadingController,
    
    ) { 
    
  }
  
  
  ngOnInit() {
  }

  getImage() {
    const storedImage = localStorage.getItem('userImage');
    if (storedImage) {
      this.userImage = JSON.parse(storedImage);
    }
  }

setFocus() {
  for (let i = 1; i <= 6; i++) {
    const inputElem = document.getElementById("pin" + i) as HTMLElement;
    if (inputElem) {
      if (i <= this.pin.length) {
        inputElem.style.background = "var(--ion-color-dark)";
      } else {
        inputElem.style.background = "var(--ion-color-base)";
      }
    }
  }
  const parentElem = document.querySelector('.numberBox') as HTMLElement;
  if (parentElem) {
    parentElem.style.background = this.pin.length === 4 ? "var(--ion-color-base)" : "var(--ion-color-base)";
  }
}


//Loader
async presentLoading( message: string, spinnerx: any){
  const loading = await this.loadingCtl.create({
    message: message,
    spinner: spinnerx
  });
  await loading.present();
}

sett(number){
  this.pin += number;
  this.setFocus();
  
  if(this.pin.length == 6){
    this.presentLoading('Validating...', 'crescent')
    //this.checkPin()
  }
  }

//backspace last pin and focus on input
back1(){
  this.pin = this.pin.slice(0, -1);
  this.setFocus();
  }

  

}
