import { Component, NO_ERRORS_SCHEMA, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActionSheetController, AlertController, IonicModule } from '@ionic/angular';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { HttpClient } from '@angular/common/http';
import { finalize } from 'rxjs/operators';
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { LoadingController, Platform, ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { Capacitor } from '@capacitor/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

const IMAGE_DIR = 'stored-images';

export interface LocalFile {
  name: string;
  path: string;
  data: string;
}

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.page.html',
  styleUrls: ['./accounts.page.scss'],
  standalone:true,
  imports:[
    CommonModule,
    FormsModule,
    IonicModule,
  ],
    schemas:[NO_ERRORS_SCHEMA]
})
export class AccountsPage implements OnInit {
  images: LocalFile[] = [];
image: any;
  userData: any;
  userImage: any;
  emailx: any;
  userImageExists: boolean;

  constructor(
    private alertController: AlertController,
    public router: Router,
    private plt: Platform,
    private http: HttpClient,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private authService: AuthService,
    private actionSheetCtrl: ActionSheetController,
  ) { }








  async ngOnInit() {
    const userDataString = localStorage.getItem('userData');
    if (userDataString) {
      this.userData = JSON.parse(userDataString);
      
///mask userEmail
// assuming the user inputted email is stored in a variable named 'email'
const [username, domain] = this.userData?.loginData.email.split('@'); // split email into username and domain
const maskedUsername = username.substring(0, 3) + '*'.repeat(username.length - 2); // mask username with asterisks
const maskedDomain = domain.substring(0, 1) + '*'.repeat(domain.length - 2) + domain.substring(domain.length - 4); // mask domain with asterisks
const maskedEmail = `${maskedUsername}@${maskedDomain}`; // concatenate masked username and domain
console.log(maskedEmail)
this.emailx = maskedEmail;
console.log('I am' + this.emailx)
  
    }


this.getImage();

// Update the value of userImageExists based on the existence of userImage
if (this.userImage) {
  this.userImageExists = true;
} else {
  this.userImageExists = false;
}


  }
  
  
  getImage() {
  const storedImage = localStorage.getItem('userImage');
  if (storedImage) {
    this.userImage = JSON.parse(storedImage);
  }
}
  async takePicture(){
    try{
      if(Capacitor.getPlatform() != 'web')
      await Camera.requestPermissions();
      const image = await Camera.getPhoto({
        source: CameraSource.Prompt,
        width: 600,
        resultType: CameraResultType.DataUrl
      });
      console.log('image',image);
      this.image = image.dataUrl
      const blob = this.dataUrltoBlob(image.dataUrl);
      const fileName = 'VeluxPay'+new Date().getTime() + '.jpeg';
      const imageFile = new File([blob], fileName, {type: 'image/png'});
      console.log(imageFile)
      let imageData = new FormData();
      imageData.append('image', imageFile)
      this.uploadData(imageData);
    }
    catch(e){}
  }


  async takePicturex(){
    try{
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.DataUrl,
        source: CameraSource.Prompt, // Camera, Photos or Prompt!
        
    });
      console.log('image',image);
      this.image = image.dataUrl
      const blob = this.dataUrltoBlob(image.dataUrl);
      const fileName = 'VeluxPay'+new Date().getTime() + '.jpeg';
      const imageFile = new File([blob], fileName, {type: 'image/png'});
      console.log(imageFile)
      let imageData = new FormData();
      imageData.append('image', imageFile)
      this.uploadData(imageData);
    }
    catch(e){}
  }


  
// Upload the formData to Godwin's API

async uploadData(imageData: any) {
// const loading = await this.loadingCtrl.create({
//   message: 'Uploading image...',
// });
// await loading.present();

// Use your own API!

console.log(imageData)  
this.authService.profile(imageData)
.pipe(
  finalize(() => {
      //loading.dismiss();
  })
).subscribe((res: any) => {
  console.log(imageData+ 'in sub');
  console.log(imageData + 'Divine')
  console.log(res)
  if (res['success']) {
      this.presentToast('File upload complete.')
  } else {
      this.presentToast('File upload failed.')
  }
}
)

}

  // Little helper
  async presentToast(text) {
    const toast = await this.toastCtrl.create({
      message: text,
      duration: 3000
    });
    toast.present();
  }

  dataUrltoBlob(dataUrl: any){
    let arr = dataUrl.split(','), 
    mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]),
    n = bstr.length,
    u8arr = new Uint8Array(n);
    while(n--){
      u8arr[n] = bstr.charCodeAt(n);
    }

    return new Blob([u8arr], {type:mime})
  }

  
  async presentAlertx(subtitle ?: string, message ?: string) {
  const alert = await this.alertController.create({
    header: 'Velux Pay',
    subHeader: subtitle || 'Sub Account',
    message: message || 'Coming Soon...',
    buttons: [
      {
        text: 'Ok',
        cssClass: 'alert-button-confirm',
      },
    ],
    backdropDismiss: false,
    cssClass: 'custom-alert',
    animated: true,
    mode: 'ios',
    translucent: true,
  });
  await alert.present();
}


verifications(){
  this.router.navigateByUrl('/accounts/verification')
}
subAccount(){
  // this.presentAlertx()
  ////this.presentAlertx('Sub Account', 'Coming Soon');
  this.router.navigateByUrl('/subaccount')
}
deleteAccount(){
  // this.presentAlertx('Delete Account', 'Are you sure you want to delete your user account?');
  this.delete()
}
remove(){
  this.authService.remove().subscribe(
    (response: any) => {
      console.log('Account Deleted successfully!', response);
         // Call OTP page here
         ///this.showOtpForm = true;
         if(response.message === 'registration failed'){
         // this.toastService.showToast(response.message+', Please try again shortly')
          //this.router.navigateByUrl('/register2')
         } else if(response.message === "Signature verification failed" && this.router.url !== '/auth-screen'){
          localStorage.removeItem('userData');
          localStorage.removeItem('res');
          localStorage.removeItem('accessT');
         // this.toastService.showToast('Session Expired.....Logging out')
   
          this.router.navigateByUrl('/auth-screen');
        }
         else{
          
         // this.showToastx(response.message)
        //  this.presentAlertr('Success', `Sub Account successfully created and your user_tagname is ${response.subaccount}!`)
          //this.router.navigateByUrl('/subaccount')
         }
         //console.log('TagName:', formData.user_tag);
     // this.router.navigateByUrl('/otp');


    },
    (error) => {
      console.error('Unable to complete failed request!', error);
     // this.presentAlertr('Failed', `Sub Account creation failed, Please try again!`)
     // this.router.navigateByUrl('/subaccount')
      //this.toastService.showToast('Check your internet connection || Network connection failed')
    }
  );
}
async delete() {
  const alert = await this.actionSheetCtrl.create({
    header: 'Are you sure you want to Delete Your Account?',
    buttons: [
      {
        text: 'Yes',
        handler: () => { 
          //this.presentAlertx('Delete Account', 'Are you sure you want to delete your user account?');
            this.remove()
         }
      },
      {
        text: 'No',
        role: 'cancel'
      }
    ]
  });

  await alert.present();


  const { role } = await alert.onWillDismiss();

  return role === 'confirm';
}

tag(){
 
  this.presentAlertx('Tag Name', 'Cannot be changed!');
 
}
name(){

  this.presentAlertx('Full Name', 'User Name cannot be changed!');
  //this.router.navigateByUrl('/settings/devices')
}
email(){
  // this.presentAlertx()
  this.presentAlertx('Email Address', 'User email cannot be changed!');
  //this.router.navigateByUrl('/settings/devices')
}


}
