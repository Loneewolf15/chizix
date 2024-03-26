import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthConstants } from '../config/auth-constants';
import { PreferencesService } from '../services/storage.service';

@Injectable({
  providedIn: 'root'
})
export class TabsGuard implements CanActivate {
  constructor(
    private router: Router,
    private preferences: PreferencesService,
  ){

  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Promise<boolean> {
    return new Promise(resolve => {
      
      this.preferences.get(AuthConstants.AUTH,).then(res =>{
        if(res){
          resolve(true);
        } else{
          resolve(false);
          this.router.navigateByUrl('/auth-screen');
        }
      }).catch(
        err => {
          resolve(false);
        }
      )
    });
  }
  
}
