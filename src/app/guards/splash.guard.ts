import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { INTRO_KEY, PreferencesService } from '../services/storage.service';

@Injectable({
  providedIn: 'root'
})
export class SplashGuard implements CanActivate {

  constructor(
    private router: Router,
    private storage: PreferencesService) { }
  
  // async canLoad(): Promise<boolean> {
  //   const hasSeenIntro = await this.storage.getPreference(INTRO_KEY);
  //   if(hasSeenIntro && hasSeenIntro.value == 'true') {
  //     return true;
  //   } else {
  //     this.router.navigateByUrl('/intro', {replaceUrl: true});
  //     return true;
  //   }

  // }
  async canActivate(): Promise<boolean> {
    const firstTimeVisit = await this.storage.get('firstTimeVisit');
    if (firstTimeVisit) {
      // Not the first time, allow navigation to AuthScreenPage
      return true;
    } else {
      // First time, navigate to IntroPage and set flag
      this.router.navigateByUrl('/intro');
      await this.storage.set('firstTimeVisit', true);
      return false;
    }
  }
}
