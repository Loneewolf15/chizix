import { Component, OnInit } from '@angular/core';
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { LoadingController, Platform } from '@ionic/angular';

const IMAGE_DIR = 'kept-images';

interface LocalFile {
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
  constructor(
    private platform: Platform,
    private loadingCtrl: LoadingController
  ) { }

  async ngOnInit() {
    this.loadFiles();
  }

  async loadFiles(){
    this.images = [];
    const loading = await this.loadingCtrl.create({
        message: 'Loading data....',
    });
    await loading.present();

    Filesystem.readdir({
      directory: Directory.Data,
      path: IMAGE_DIR
    }).then(result => {
console.log('ARRIVED!!: ', result);
//this.loadFileData(result.files)
    }, async err => {
      console.log('err: ', err);
      await Filesystem.mkdir({
        directory: Directory.Data,
        path: IMAGE_DIR,
      });
    }).then(_ => {
      loading.dismiss();
    })
  }

  async loadFileData(fileNames: string[]){

    for(let file of fileNames){  
      const filePath = `${IMAGE_DIR}/${file}`;
      const readFile = await Filesystem.readFile({
        directory: Directory.Data,
        path: filePath,
      });
      console.log('Read: ', readFile);
      
    }
  }

  async selectImage(){
    const image = await Camera.getPhoto({
quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
    });
    console.log(image)
    if(image) {
this.saveImage(image);
    }
  }


  async saveImage(photo: Photo){
    const base64Data = await this.readAsBase64(photo);
    console.log(base64Data);
    

  const fileName = 'velux_pay' + new Date().getTime() + '.jpeg';
//const fileName = new Date().getTime() + '.jpeg';
const savedFile = await Filesystem.writeFile({
  directory: Directory.Data,
  path: `${IMAGE_DIR}/${fileName}`,
  data: base64Data
})
console.log('Saved: ', savedFile);
this.loadFiles();

  }

  
async readAsBase64(photo: Photo){

  if(this.platform.is('hybrid')) {
    const file = await Filesystem.readFile({
      path: photo.path
    });
    return file.data;
  }
  else {
    // Fetch the Photo, read as a blob, then convert to base64 format
    const response = await fetch(photo.webPath);
      const blob = await response.blob();

      return await this.convertBlobToBase64(blob) as string;
  }
}

// Helper Function used in readingBase64

convertBlobToBase64 = (blob: Blob) => new Promise((resolve, reject) => {
  const reader = new FileReader;
  reader.onerror = reject;
  reader.onload = () => {
    resolve(reader.result);
  };
  reader.readAsDataURL(blob);
});



































}
