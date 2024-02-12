import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(
    public toast: ToastController,
  ) { }

  async showToast( infoMessage: string){
    const toastx = await this.toast.create({
      message: infoMessage,
      duration: 2000,
      color: 'danger'
    });
    toastx.present();
  }
}
