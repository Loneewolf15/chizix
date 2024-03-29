import { Component, OnInit } from '@angular/core';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { HttpClient } from '@angular/common/http';
import { finalize } from 'rxjs/operators';
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { LoadingController, Platform, ToastController } from '@ionic/angular';
import { ImageService } from 'src/app/services/image.service';
import { AuthService } from 'src/app/services/auth.service';
import { Capacitor } from '@capacitor/core';
import { PreferencesService } from 'src/app/services/storage.service';
import { Router } from '@angular/router';
const IMAGE_DIR = 'stored-images';

export interface LocalFile {
    name: string;
    path: string;
    data: string;
}

@Component({
  selector: 'app-selfie',
  templateUrl: './selfie.page.html',
  styleUrls: ['./selfie.page.scss'],
})
export class SelfiePage implements OnInit {
    images: LocalFile[] = []; 
    image:any;
    constructor(
        private plt: Platform,
        private http: HttpClient,
        private loadingCtrl: LoadingController,
        private toastCtrl: ToastController,
        private imageService: ImageService,
        private authService: AuthService,
        private storage: PreferencesService,
        private router: Router,
    ) {}

    async ngOnInit() {
      //   this.loadFiles();
      // // this.imageService.setImages(this.images);
    }
    
    async takePicture(){
      try{
        // if(Capacitor.getPlatform() != 'web')
        // await Camera.requestPermissions();
        // const image = await Camera.getPhoto({
        //   source: CameraSource.Camera,
        //   width: 600,
        //   resultType: CameraResultType.DataUrl
        // });
        const image = await Camera.getPhoto({
          quality: 90,
          allowEditing: false,
          resultType: CameraResultType.DataUrl,
          source: CameraSource.Camera, // Camera, Photos or Prompt!
          
      });
        console.log('image',image);
        this.image = image.dataUrl
        const blob = this.dataUrltoBlob(image.dataUrl);
        const fileName = 'VeluxPay'+new Date().getTime() + '.jpeg';
        const imageFile = new File([blob], fileName, {type: 'image/png'});
        console.log(imageFile)
        let imageData = new FormData();
        imageData.append('selfie', imageFile)
        
      }
      catch(e){}
    }

    dataUrltoBlob(dataUrl: any) {
      if (dataUrl) {
        let arr = dataUrl.split(','), 
          mime = arr[0].match(/:(.*?);/)[1],
          bstr = atob(arr[1]),
          n = bstr.length,
          u8arr = new Uint8Array(n);
    
        while (n--) {
          u8arr[n] = bstr.charCodeAt(n);
        }
    
        return new Blob([u8arr], { type: mime });
      }
    
      return null; // Return null or handle the case when dataUrl is undefined
    }
    
//     Convert the base64 to blob data
// and create  formData with it

async startUpload(image: any) {
  try {
    this.image = image.dataUrl;
    const blob = this.dataUrltoBlob(image.dataUrl);
    const fileName = 'VeluxPay' + new Date().getTime() + '.jpeg';
    const imageFile = new File([blob], fileName, { type: 'image/png' });
    let imageData = new FormData();
    imageData.append('selfie', imageFile);
    this.uploadData(imageData);
  } catch (e) {
    console.log(e + ' ' + 'Hello Error');
  }
}

async uploadData(imageData: any) {
  const loading = await this.loadingCtrl.create({
    message: 'Uploading image...',
  });
  await loading.present();

  this.authService.validate(imageData)
    .pipe(finalize(() => {
      loading.dismiss();
    }))
    .subscribe((res: any) => {
      console.log(imageData + 'in sub');
      console.log(imageData + 'Divine');
      console.log(res);
      if (res.message === 'selfie successfully uploaded') {
                this.presentToast('File upload complete.');
                this.router.navigateByUrl('/tabs')
            } else {
                this.presentToast('File upload failed.')
            }
    }, (error) => {
      console.log(error);
      this.presentToast('An error occurred during the upload.');
    });
}






// async startUpload(image: any) {
//   try{
//     this.image = image.dataUrl
//     console.log(image.dataUrl)
//     const blob = this.dataUrltoBlob(image.dataUrl);
//     const fileName = 'VeluxPay'+new Date().getTime() + '.jpeg';
//     const imageFile = new File([blob], fileName, {type: 'image/png'});
//     console.log(imageFile)
//     let imageData = new FormData();
//     imageData.append('selfie', imageFile);
//     this.uploadData(imageData);
//   }
//   catch(e){
//     console.log(e+' '+'Hello Error')
//   }
// }


    // async uploadImage(blob:any, imageData:any){
    //   try{
    //     const fileName = 'VeluxPay'+new Date().getTime() + '.jpeg';
    //     const filePath = `${IMAGE_DIR}/${fileName}/${imageData.format}`;
    //   //  const fileRef = ref(this.storage, filePath)
    //   }catch(e){

    //   }
    // }
// Upload the formData to Godwin's API

// async uploadData(imageData: any) {
// const loading = await this.loadingCtrl.create({
//     message: 'Uploading image...',
// });
// await loading.present();

// // Use your own API!

//  console.log(imageData)  
// this.authService.validate(imageData)
// .pipe(
//     finalize(() => {
//         loading.dismiss();
//     })
// ).subscribe((res: any) => {
//     console.log(imageData+ 'in sub');
//     console.log(imageData + 'Divine')
//     console.log(res)
//     if (res.message === 'selfie successfully uploaded') {
//         this.presentToast('File upload complete.');
//         this.router.navigateByUrl('/tabs')
//     } else {
//         this.presentToast('File upload failed.')
//     }
// }
// )

// // const url = 'http://localhost:8888/images/upload.php';

// // this.http.post(url, formData)
// //     .pipe(
// //         finalize(() => {
// //             loading.dismiss();
// //         })
// //     )
// //     .subscribe(res => {
// //         if (res['success']) {
// //             this.presentToast('File upload complete.')
// //         } else {
// //             this.presentToast('File upload failed.')
// //         }
// //     });
// }

async presentToast(text) {
  const toast = await this.toastCtrl.create({
      message: text,
      duration: 3000
  });
  toast.present();
}





}