import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-verify',
  templateUrl: './verify.page.html',
  styleUrls: ['./verify.page.scss'],
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
    this.router.navigateByUrl('/tabs')
  }
  
  selfie(){
    this.router.navigateByUrl('/verification/selfie')
  }
  scan(){
    this.router.navigateByUrl('/verification/scan')
  }
  
  
  
}
