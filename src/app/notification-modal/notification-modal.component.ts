import { CUSTOM_ELEMENTS_SCHEMA, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { IonModal, ModalController, AnimationController, IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-notification-modal',
  templateUrl: './notification-modal.component.html',
  styleUrls: ['./notification-modal.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class NotificationModalComponent implements OnInit {
  @ViewChild('container', { static: false }) container: ElementRef;

  modalWidth: string = 'auto';
  @Input() header: string;
  @Input() subHeader: string;
  @Input() message: string;
  @Input() imgSrc: string;
  //@Input() notification: any[] = [];
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
   
  ) {
    this.checkContentWidth();
  }


  checkContentWidth() {
    setTimeout(() => {
      const containerWidth = this.container.nativeElement.offsetWidth;
      const windowWidth = window.innerWidth;
      
      if (containerWidth > 1.5 * windowWidth) {
        this.modalWidth = '100%'; // Set width to 80% if content width exceeds 80% of window width
      }
    }, 0);
  }

  yes() {
    this.modalController.dismiss();
    this.router.navigateByUrl('/register/veri')
  }
  Close() {
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
