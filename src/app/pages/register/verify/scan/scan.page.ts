import { CommonModule } from '@angular/common';
import { Component, NO_ERRORS_SCHEMA, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IonicModule, LoadingController, ToastController } from '@ionic/angular';
import { finalize } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';
import { NinService } from 'src/app/services/nin.service';

@Component({
  selector: 'app-scan',
  templateUrl: './scan.page.html',
  styleUrls: ['./scan.page.scss'],
  standalone:true,
  imports:[
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
  ],
    schemas:[NO_ERRORS_SCHEMA]

})
export class ScanPage implements OnInit {
  
  selectedFile: File | null = null;
  selectedFileDataUrl: string | ArrayBuffer | null = null;
  nin: any;

  constructor(
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private authService: AuthService,
    private router: Router,
    private igs: NinService,
  ) {}

  ngOnInit() {
  }

  onFileChange(event: any) {
    const files = event.target.files;
    if (files && files.length > 0) {
      this.selectedFile = files[0];
      this.readFile();
    }
    this.nin = files
  }

  readFile() {
    const reader = new FileReader();
    reader.onload = (e) => {
      this.selectedFileDataUrl = e.target?.result;
    };
    reader.readAsDataURL(this.selectedFile as Blob);
  }

  formatFileSize(size: number): string {
    const kilobytes = size / 1024;
    if (kilobytes < 1024) {
      return kilobytes.toFixed(2) + ' KB';
    } else {
      const megabytes = kilobytes / 1024;
      return megabytes.toFixed(2) + ' MB';
    }
  }

async presentToast(text) {
  const toast = await this.toastCtrl.create({
      message: text,
      duration: 3000
  });
  toast.present();
}

  // this.image = image.dataUrl
  // const blob = this.dataUrltoBlob(image.dataUrl);
  // const fileName = 'VeluxPay'+new Date().getTime() + '.jpeg';
  // const imageFile = new File([blob], fileName, {type: 'image/png'});

  upload(event: Event){
   // const file = (event.target as HTMLInputElement).files[0];
    const sendData  = new FormData();
   // sendData.append('nin', this.nin)
   // console.log(sendData)
    console.log(this.nin)
     // Convert selected file to Blob
  const blob = this.dataUrltoBlob(this.selectedFileDataUrl as string);

  // Append the Blob to the FormData
  sendData.append('nin', blob, this.selectedFile?.name);
    console.log(sendData)
   this.uploadData(sendData)
  }
  
  async uploadData(sendData: any) {
    const loading = await this.loadingCtrl.create({
      message: 'Uploading ID...Please wait...',
    });
    await loading.present();
  
    this.authService.validaten(sendData)
      .pipe(finalize(() => {
        loading.dismiss();
      }))
      .subscribe((res: any) => {
        console.log(sendData + 'in sub');
        console.log(sendData + 'Divine');
        console.log(res);
        if (res.message === 'nin successfully uploaded') {
                 this.igs.setscanStatus(true);
                  this.presentToast('ID upload complete.');
                  this.router.navigateByUrl('/register/veri')
              } else {
                  this.presentToast('ID upload failed.')
              }
      }, (error) => {
        console.log(error);
        this.presentToast('An error occurred during the upload.');
      });
  }
  
  dataUrltoBlob(dataUrl: string): Blob {
    const byteString = atob(dataUrl.split(',')[1]);
    const mimeString = dataUrl.split(',')[0].split(':')[1].split(';')[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: mimeString });
  }

}