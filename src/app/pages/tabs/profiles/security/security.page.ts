import { CommonModule } from '@angular/common';
import { Component, NO_ERRORS_SCHEMA, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-security',
  templateUrl: './security.page.html',
  styleUrls: ['./security.page.scss'],
  standalone:true,
  imports:[
    CommonModule,
    FormsModule,
    IonicModule,
  ],
    schemas:[NO_ERRORS_SCHEMA]
})
export class SecurityPage implements OnInit {

isToggled = false;

  constructor(public router : Router,) { }

  ngOnInit() {
  }

  toggle2Fa(event){
    console.log(event);
    if(event.detail.checked){
//document.body.setAttribute('color-theme', 'dark')
    }
  }
  

  changePin(){
this.router.navigateByUrl('/change-pin')
  }

}
