import { CommonModule } from '@angular/common';
import { Component, NO_ERRORS_SCHEMA, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Preferences } from '@capacitor/preferences';
import { IonicModule } from '@ionic/angular';
import { PreferencesService } from 'src/app/services/storage.service';

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
darkMode = true;
  constructor(
    public router : Router,
    private preferences: PreferencesService,
    
    ) { }

  ngOnInit() {
  
   // this.checkAppMode();
  }


  async checkAppMode() {
    const checkIsDarkMode = await Preferences.get({key: 'darkModeActivated'});
    console.log(checkIsDarkMode);
    checkIsDarkMode?.value == 'true'
      ? (this.darkMode = true)
      : (this.darkMode = false);
    document.body.classList.toggle('dark', this.darkMode);
  }

  toggleDarkMode() {
    this.darkMode = !this.darkMode;
    document.body.classList.toggle('dark', this.darkMode);
    if(this.darkMode) {
      Preferences.set({key: 'darkModeActivated', value: 'true'}); 
    } else {
      
      Preferences.set({key: 'darkModeActivated', value: 'false'});
    }
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
