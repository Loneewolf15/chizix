import { CommonModule } from '@angular/common';
import { Component, NO_ERRORS_SCHEMA, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { AppLaunchService } from 'src/app/services/app-launch.service';
import { SignInSubComponent } from './sign-in-sub/sign-in-sub.component';
import { SignInComponent } from './sign-in/sign-in.component';
@Component({
  selector: 'app-auth-screen',
  templateUrl: './auth-screen.page.html',
  styleUrls: ['./auth-screen.page.scss'],
  standalone: true,
  imports:[  CommonModule, 
    ReactiveFormsModule,
    IonicModule,
    SignInComponent,
    SignInSubComponent
  ],
  schemas: [NO_ERRORS_SCHEMA]
})
export class AuthScreenPage implements OnInit {

  segmentValue = '1';

  constructor( private appLaunchService: AppLaunchService,
    private router: Router) { }

    ngOnInit() {
      // if (!this.appLaunchService.isAppLaunched()) {
      //   this.router.navigateByUrl('/splash');
      //   this.appLaunchService.setAppLaunched();
      // }
    }
    

  segmentChanged(event) {
    console.log(event);
    this.segmentValue = event.detail.value;
  }

}
