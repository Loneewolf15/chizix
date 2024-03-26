import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { PreferencesService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-devices',
  templateUrl: './devices.page.html',
  styleUrls: ['./devices.page.scss'],
})
export class DevicesPage implements OnInit {

  constructor(
    private router: Router,
    private storage: PreferencesService,
    private authService: AuthService,
  ) { }

  ngOnInit() {
  }

  async onRemove(){
    
      this.router.navigateByUrl('/auth-screen', {replaceUrl: true});    
      return true;
    }

    logout(){
      this.authService.logout()
        }
  }


