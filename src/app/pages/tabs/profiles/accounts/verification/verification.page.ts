import { Component, NO_ERRORS_SCHEMA, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-verification',
  templateUrl: './verification.page.html',
  styleUrls: ['./verification.page.scss'],
  standalone:true,
  imports:[
    CommonModule,
    FormsModule,
    IonicModule,
  ],
    schemas:[NO_ERRORS_SCHEMA]
})
export class VerificationPage implements OnInit {

  constructor(
    public router : Router,
  ) { }

  ngOnInit() {
  }

  selfie(){
    this.router.navigateByUrl('/verification/selfie')
  }
  scan(){
    this.router.navigateByUrl('/verification/scan')
  }
}
