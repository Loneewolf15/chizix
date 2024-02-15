import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { IonModal, ModalController, AnimationController } from '@ionic/angular';

@Component({
  selector: 'app-login-status',
  templateUrl: './login-status.component.html',
  styleUrls: ['./login-status.component.scss'],
})
export class LoginStatusComponent implements OnInit {
 // @ViewChild('modalx') modalx: IonModal;
  @Input() header: string;
  @Input() subHeader: string;
  @Input() message: string;
  @Input() imgSrc: string;
  @Input() showGoBackButton: boolean;

  constructor(private router: Router,
    private modalController: ModalController,
    private animationCtrl: AnimationController,
    private authService: AuthService,
    ) {
    //this.modalx.present();
  }
  
  // ionViewDidEnter() {
  //   this.modalx.present();
  // }

  ngOnInit(
   
  ) {}

  yes() {
    this.modalController.dismiss();
    this.authService.logout();
  }

  no(){
    //this.modalController,dismiss();
    this.modalController.dismiss();
  }

  enterAnimation = (baseEl: HTMLElement) => {
    const root = baseEl.shadowRoot;

    const backdropAnimation = this.animationCtrl
      .create()
      .addElement(root.querySelector('ion-backdrop')!)
      .fromTo('opacity', '0', 'var(--backdrop-opacity)');

    const wrapperAnimation = this.animationCtrl
      .create()
      .addElement(root.querySelector('.modal-wrapper')!)
      .keyframes([
        { offset: 0, opacity: '0', transform: 'scale(0)' },
        { offset: 1, opacity: '1.0', transform: 'scale(1)' },
      ]);

    return this.animationCtrl
      .create()
      .addElement(baseEl)
      .easing('ease-out')
      .duration(500)
      .addAnimation([backdropAnimation, wrapperAnimation]);
  };

  leaveAnimation = (baseEl: HTMLElement) => {
    return this.enterAnimation(baseEl).direction('reverse');
  };


}
