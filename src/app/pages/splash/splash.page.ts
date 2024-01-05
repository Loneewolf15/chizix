import { CommonModule } from '@angular/common';
import { Component, NO_ERRORS_SCHEMA, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-splash',
  templateUrl: './splash.page.html',
  styleUrls: ['./splash.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
  ],
  schemas: [NO_ERRORS_SCHEMA]
})
export class SplashPage implements OnInit {

  constructor(public router:Router) { 
    setTimeout(()=>{
      console.log('Leaving Splash')
      this.router.navigateByUrl('/auth-screen');
    },2000);

  
  }
  
  dismiss() {
    this.router.navigateByUrl('/auth-screen');; // replace 'home' with the page you want to navigate to after dismissing IntroPage
  }
  ngOnInit() {
  }

}
