import { Component, OnInit } from '@angular/core';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { HttpClient } from '@angular/common/http';
import { finalize } from 'rxjs/operators';
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { LoadingController, Platform, ToastController } from '@ionic/angular';
import { ImageService } from 'src/app/services/image.service';
import { AuthService } from 'src/app/services/auth.service';
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
   // images: LocalFile[] = [];
images:any;
    constructor(
        private plt: Platform,
        private http: HttpClient,
        private loadingCtrl: LoadingController,
        private toastCtrl: ToastController,
        private imageService: ImageService,
        private authService: AuthService,
    ) {}

    async ngOnInit() {
        this.loadFiles();
       // this.imageService.setImages(this.images);
    }

    async loadFiles() {
        this.images = [];

        const loading = await this.loadingCtrl.create({
            message: 'Loading data...'
        });
        await loading.present();

        Filesystem.readdir({
            path: IMAGE_DIR,
            directory: Directory.Data
        })
            .then(
                (result) => {
        let resultx = result.files.map(file => file.name) 
                    this.loadFileData(resultx);
                    
                },
                async (err) => {
                    // Folder does not yet exists!
                    await Filesystem.mkdir({
                        path: IMAGE_DIR,
                        directory: Directory.Data
                    });
                }
            )
            .then((_) => {
                loading.dismiss();
            });
    }

    // Get the actual base64 data of an image
    // base on the name of the file
    async loadFileData(fileNames: string[]) {
        for (let f of fileNames) {
            const filePath = `${IMAGE_DIR}/${f}`;

            const readFile = await Filesystem.readFile({
                path: filePath,
                directory: Directory.Data
            });

            this.images.push({
                name: f,
                path: filePath,
                data: `data:image/jpeg;base64,${readFile.data}`
            });
        }
       // Set the images in the image service
// this.imageService.setImages(this.images);
//console.log('I stored', this.imageService.setImages(JSON.parse(this.images)));
}

    // Little helper
    async presentToast(text) {
        const toast = await this.toastCtrl.create({
            message: text,
            duration: 3000
        });
        toast.present();
    }


async selectImage() {
    const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.Uri,
        source: CameraSource.Camera, // Camera, Photos or Prompt!
        
    });

    if (image) {
        this.saveImage(image)
         // Set the images in the image service
this.imageService.setImages(this.images);
    }
}

// Create a new file from a capture image
async saveImage(photo: Photo) {
    const base64Data = await this.readAsBase64(photo);

    const fileName = 'VeluxPay'+new Date().getTime() + '.jpeg';
    const savedFile = await Filesystem.writeFile({
        path: `${IMAGE_DIR}/${fileName}`,
        data: base64Data,
        directory: Directory.Data
    });

    // Reload the file list
    // Improve by only loading for the new image and unshifting array!
    this.loadFiles();
}

// https://ionicframework.com/docs/angular/your-first-app/3-saving-photos
private async readAsBase64(photo: Photo) {
    if (this.plt.is('hybrid')) {
        const file = await Filesystem.readFile({
            path: photo.path
        });

        return file.data;
    }
    else {
        // Fetch the photo, read as a blob, then convert to base64 format
        const response = await fetch(photo.webPath);
        const blob = await response.blob();

        return await this.convertBlobToBase64(blob) as string;
    }
}

// Helper function
convertBlobToBase64 = (blob: Blob) => new Promise((resolve, reject) => {
    const reader = new FileReader;
    reader.onerror = reject;
    reader.onload = () => {
        resolve(reader.result);
    };
    reader.readAsDataURL(blob);
});


// Convert the base64 to blob data
// and create  formData with it

async startUpload(file: LocalFile) {
const response = await fetch(file.data);
const blob = await response.blob();
const formData = new FormData();
formData.append('selfie', blob, file.name);
console.log(file.name)
console.log('First', formData)
this.uploadDatax(formData);
}

// async startUpload(file: LocalFile) {
//     const response = await fetch(file.data);
//     console.log(response)
//     console.log(file.data)
//     const blob = await response.blob();
//     console.log(blob)
//     const fileData = new File([blob], file.name);
//   console.log(fileData)
//     const form = new FormData();
//     form.append('selfie', fileData);
//   console.log(form)
//     this.uploadData(form);
//   }
  
  

// Upload the formData to Godwin's API

async uploadData(formData: FormData) {
const loading = await this.loadingCtrl.create({
    message: 'Uploading image...',
});
await loading.present();

// Use your own API!

 console.log(formData)  
// this.authService.validate(formData)
// .pipe(
//     finalize(() => {
//         loading.dismiss();
//     })
// ).subscribe((res: any) => {
//     console.log(formData + 'in sub');
//     console.log(formData + 'Divine')
//     console.log(res)
//     if (res['success']) {
//         this.presentToast('File upload complete.')
//     } else {
//         this.presentToast('File upload failed.')
//     }
// }
// )

 const url = 'http://localhost:8888/image/upload.php';

 this.http.post(url, formData)
    .pipe(
        finalize(() => {
            loading.dismiss();
        })
    )
    .subscribe(res => {
        if (res['success']) {
            this.presentToast('File upload complete.')
        } else {
            this.presentToast('File upload failed.')
        }
    });
}

async uploadDatax(formData: FormData) {
    const loading = await this.loadingCtrl.create({
      message: 'Uploading image...',
    });
    await loading.present();
  
    try {
      this.authService.validate(formData)
        .pipe(
          finalize(() => {
            loading.dismiss();
          })
        )
        .subscribe((res: any) => {
          console.log(formData + 'in sub');
          console.log(formData + 'Divine');
          console.log(res);
          if (res['success']) {
            this.presentToast('File upload complete.');
          } else {
            this.presentToast('File upload failed.');
          }
        });
    } catch (error) {
      console.error('Error uploading data:', error);
      this.presentToast('File upload failed.');
      loading.dismiss();
    }
  }
  
  

async deleteImage(file: LocalFile) {
await Filesystem.deleteFile({
    directory: Directory.Data,
    path: file.path
});
this.loadFiles();
this.presentToast('File removed.');
this.retake();
}

async retake() {
// this.deleteImage(file.data)
    const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.Uri,
        source: CameraSource.Camera // Camera, Photos or Prompt!
    });
// this.deleteImage()  await this.deleteImage(file.name);
    if (image) {
    // const file = await this.saveImage(image);
    
        this.saveImage(image)
    }
}

}