import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-settings',
  templateUrl: '../settings/settings.page.html',
  styleUrls: ['../settings/settings.page.scss'],
})
export class SettingsPage implements OnInit {

  constructor(
    private authService: AuthService,
    private router : Router
  ) { }

  ngOnInit() {
  }

  toggleTheme(event){
    console.log(event);
    if(event.detail.checked){
document.body.setAttribute('color-theme', 'dark')
    } else{
      document.body.setAttribute('color-theme', 'light')
    }
  }
devices(){
this.router.navigateByUrl('/settings/devices')
}
notify(){
  this.router.navigateByUrl('settings/notification')
}

}
