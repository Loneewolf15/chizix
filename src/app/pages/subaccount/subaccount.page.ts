import { CommonModule } from '@angular/common';
import { Component, NO_ERRORS_SCHEMA, OnInit } from '@angular/core';
import { FormBuilder, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, IonicModule, LoadingController, ModalController, ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { PreferencesService } from 'src/app/services/storage.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-subaccount',
  templateUrl: './subaccount.page.html',
  styleUrls: ['./subaccount.page.scss'],
  standalone: true,
  imports:[
    CommonModule,
    FormsModule,
    IonicModule,
  ],
    schemas:[NO_ERRORS_SCHEMA]
})
export class SubaccountPage implements OnInit {
subAccounts: any[] = [];
subUser: any[] = [];
  constructor(
    private alertController: AlertController,
    public router : Router,
    public loadingCtl : LoadingController,
  public toastCtl : ToastController,
  private loadingCtrl: LoadingController,
  private formBuilder: FormBuilder,
  private modalCtrl: ModalController,
  private toastCtrl: ToastController,
  private storage: PreferencesService,
  private authService: AuthService,
  private toastService: ToastService,
  private toastController: ToastController,
  private modalController: ModalController,
  ) {
    setInterval(() => {
      console.log("fetching users.....huurraay");
      this.getSubUser();

    }, 45000);
   }

  ngOnInit() {


this.getSubUser();
    this.subAccounts   = [
      { id: 1, title: 'Account 1', username: 'Globalstore001', password: 'revalueter' },
      { id: 2, title: 'Account 2', username: 'Globalstore002', password: 'revalueter' },
      { id: 3, title: 'Account 3', username: 'Globalstore003', password: 'revalueter' },
      { id: 4, title: 'Account 4', username: 'Globalstore004', password: 'revalueter' },
      { id: 5, title: 'Account 5', username: 'Globalstore005', password: 'revalueter' },
    ];
  }

  registerSub(){
    this.router.navigateByUrl('/register2')
  }
  async showToastx( infoMessage: string){
    const toasty = await this.toastCtrl.create({
      message: infoMessage,
      duration: 2000,
      color: 'success'
    });
    toasty.present();
  }

  async presentAlertr( subtitle?: string, message?: string) {
    const alert = await this.alertController.create({
      header: 'Velux Pay',
      subHeader: subtitle,
      message: message,
      buttons: [{
        text: 'OK',
        cssClass: 'alert-button-confirm',
        handler: () => {
          if (subtitle !== 'Failed') {
            this.router.navigateByUrl('/tabs');
          }
        }
      }],
      backdropDismiss: false,
      cssClass: 'custom-alert',
      animated: true,
      mode: 'ios',
      translucent: true,
      // Add the image to the alert
      // inputs: [
      //   {
      //     type: 'image',
      //     src: status === 'successful' ? 'assets/imgs/received.png' : 'assets/imgs/sent.png'
      //   }
      // ]
    });
    await alert.present();
  }

enroll(){
  this.authService.createSub().subscribe(
    (response: any) => {
      console.log('Sub Account Creation successful!', response);
         // Call OTP page here
         ///this.showOtpForm = true;
         if(response.message === 'registration failed'){
          this.toastService.showToast(response.message+', Please try again shortly')
          this.router.navigateByUrl('/register2')
         } else if(response.message === "Signature verification failed" && this.router.url !== '/auth-screen'){
          localStorage.removeItem('userData');
          localStorage.removeItem('res');
          localStorage.removeItem('accessT');
          this.toastService.showToast('Session Expired.....Logging out')
   
          this.router.navigateByUrl('/auth-screen');
        }
         else{
          
          this.showToastx(response.message)
          this.presentAlertr('Success', `Sub Account successfully created and your user_tagname is ${response.tagname}!`)
          this.router.navigateByUrl('/subaccount')
         }
         //console.log('TagName:', formData.user_tag);
     // this.router.navigateByUrl('/otp');


    },
    (error) => {
      console.error('Unable to complete failed request!', error);
      this.presentAlertr('Failed', `Sub Account creation failed, Please try again!`)
      this.router.navigateByUrl('/subaccount')
      this.toastService.showToast('Check your internet connection || Network connection failed')
    }
  );
}
  getSubUser(){
    this.authService.getSubUser().subscribe(
      (response: any) => {
        if(response.message === "Signature verification failed" && this.router.url !== '/auth-screen' && this.router.url === '/subaccount'){
          localStorage.removeItem('userData');
          localStorage.removeItem('res');
          localStorage.removeItem('accessT');
          this.toastController.create()
         // this.presentToast('Session Expired.....Logging out', 'danger');
          this.router.navigateByUrl('/auth-screen');
        }
        else{
  console.log(response)
         this.subUser = response;
  //this.arrayData = JSON.parse(response.plans);
  //this.filteredOptions = this.plans
  //const data = this.plans
          ///logic goes here 
          for(let res of response){
            console.log(res.full_name)
           // this.tagName = res;
          }
  
          //localStorage.setItem('tagName', JSON.stringify(response));
         // this.tagNamex = localStorage.getItem('tagName');
         // console.log(this.tagNamex)
         // this.filteredTags = [...this.tagName];
        console.log('Returned Data', response);
          console.log('Fullnames', response.full_name);
  
  
  }
      },
      (error) => { 
        if(this.router.url === '/subaccount'){
        this.toastService.showToast('Could not complete your request try again!')
         console.error('Could not complete your request try again!', error);
      }
      }
    );
  }



  deleteSubUser(user_tag: string, veluxite_id: string){
    const formData = new FormData();
    formData.append('veluxite_id', veluxite_id);
    formData.append('user_tag', user_tag);
    console.log(formData)
    const sub = {
      veluxite_id: veluxite_id,
      user_tag: user_tag,
    }
    console.log(sub)
    this.authService.deleteSub(sub).subscribe(
      (response: any) => {
        if(response.message === "Signature verification failed" && this.router.url !== '/auth-screen' && this.router.url === '/subaccount'){
          localStorage.removeItem('userData');
          localStorage.removeItem('res');
          localStorage.removeItem('accessT');
          this.toastController.create()
         // this.presentToast('Session Expired.....Logging out', 'danger');
          this.router.navigateByUrl('/auth-screen');
        }
        else{
  console.log(response)
  if(response.message === "deleted sucessfully"){
    this.showToastx('Sub Account successfully deleted');
    this.router.navigateByUrl('/subaccount');
    this.getSubUser();
  }
       
  }
      },
      (error) => { 
        if(this.router.url === '/subaccount'){
        this.toastService.showToast('Could not complete your request try again!')
         console.error('Could not complete your request try again!', error);
      }
      }
    );
  }
  
}
