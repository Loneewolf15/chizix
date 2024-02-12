import { CommonModule } from '@angular/common';
import { Component, NO_ERRORS_SCHEMA, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-verify',
  templateUrl: './verify.page.html',
  styleUrls: ['./verify.page.scss'],
  standalone:true,
  imports:[
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
  ],
    schemas:[NO_ERRORS_SCHEMA]
})
export class VerifyPage implements OnInit {

  allTransactions: any[] = [];
  transactions: any[] = [];
  segmentValue = 'in';

  constructor(
    public router : Router,
  ) { }

  ngOnInit() {
  
  }

  

  goToLogin(){
    this.router.navigateByUrl('/auth-screen')
  }
  
  selfie(){
    this.router.navigateByUrl('/verification/selfie')
  }
  scan(){
    this.router.navigateByUrl('/verification/scan')
  }
  
  
  
}
