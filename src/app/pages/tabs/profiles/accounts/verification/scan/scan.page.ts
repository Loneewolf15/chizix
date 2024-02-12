import { CommonModule } from '@angular/common';
import { Component, NO_ERRORS_SCHEMA, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

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

  constructor() { }

  ngOnInit() {
  }

  upload(event: Event){
    const file = (event.target as HTMLInputElement).files[0];
    const sendData  = new FormData();
    sendData.append('nin', file)
    console.log(sendData)
  }
}
