import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, IonInput, NavController } from '@ionic/angular';
// import { Storage } from '@ionic/storage';
import { PreferencesService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-transaction-pin',
  templateUrl: './transaction-pin.page.html',
  styleUrls: ['./transaction-pin.page.scss'],
})
export class TransactionPinPage implements OnInit {

  digit1: number;
  digit2: number;
  digit3: number;
  digit4: number;

 pin: string;
  confirmPin: string;
  pin1: string;
  pin2: string;
  pin3: string;
  pin4: string;
  
  confirmPin1: string;
  confirmPin2: string;
  confirmPin3: string;
  confirmPin4: string;

  @ViewChild('digit1Input') digit1Input: ElementRef;

  @ViewChild('pinInput1') pinInput1: IonInput;
  @ViewChild('pinInput2') pinInput2: IonInput;
  @ViewChild('pinInput3') pinInput3: IonInput;
   constructor(
    private navCtrl: NavController,
 
    public router : Router,
    private preferences: PreferencesService,
    public alertController: AlertController
  ) {}

  ngOnInit() {
    this.digit1Input.nativeElement.focus();
  }


  focusNext(event, nextInput) {
    if (event.target.value.length === 1) {
      nextInput.setFocus();
    }
  }



  onSubmit() {
    // Check if PINs match
    if (this.pin === this.confirmPin) {
      // PINs match, save new PIN and navigate to next page
      try {
        //storing pin
        this.preferences.store('transactionPin', this.pin);
        localStorage.setItem('transactionPin', this.pin);

        //Navigate to home page
        //this.navCtrl.navigateForward('/next-page');
        this.router.navigateByUrl("/tabs/home")
      } catch (error) {
        console.error('Error saving PIN:', error);
        alert('An error occurred while saving the PIN. Please try again later.');
      }
    } else {
      // PINs don't match, show error message
      alert('PINs do not match. Please try again.');
      console.log('Invalid PIN');
    }
  }
  

  async setPin() {
    const pin = this.pin1 + this.pin2 + this.pin3 + this.pin4;
    const confirmPin = this.confirmPin1 + this.confirmPin2 + this.confirmPin3 + this.confirmPin4;
    console.log(pin.length)
    if (pin.length !== 4) {
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Please enter a 4-digit pin',
        buttons: ['OK'],
      });
      await alert.present();
    } else if (pin !== confirmPin) {
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Pins do not match',
        buttons: ['OK'],
      });
      await alert.present();
    } else {
      // TODO: Save the pin to the backend
      const alert = await this.alertController.create({
        header: 'Success',
        message: 'Pin has been set successfully',
        buttons: ['OK'],
      });
      await alert.present();
    }
  }
  


}


 

