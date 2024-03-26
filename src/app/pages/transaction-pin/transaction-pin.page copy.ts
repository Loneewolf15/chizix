import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
// import { Storage } from '@ionic/storage';
import { PreferencesService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-transaction-pin',
  templateUrl: './transaction-pin.page.html',
  styleUrls: ['./transaction-pin.page.scss'],
})
export class TransactionPinPage implements OnInit {

 pin: string;
  confirmPin: string;
   constructor(
    private navCtrl: NavController,
 
    public router : Router,
    private preferences: PreferencesService,
  ) {}

  ngOnInit() {
  }




  submit() {
    if (this.pin === this.confirmPin && this.pin.length === 4) {
      // Save the PIN to the database
      //this.storage.set('transactionPin', this.pin);

      this.preferences.store('transactionPin', this.pin);
localStorage.setItem('transactionPinx', this.pin);
      // Navigate to the home page
      this.navCtrl.navigateRoot('/home');
      this.router.navigateByUrl("/tabs/home")
    } else {
      // Display an error message,  if Pins do not match
      console.log('Invalid PIN');
      alert('PINs do not match. Please try again.');
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
  


}


 

