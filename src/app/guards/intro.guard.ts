import { Injectable } from '@angular/core';
import { CanLoad, Router } from '@angular/router';

import { INTRO_KEY, PreferencesService } from '../services/storage.service';

@Injectable({
  providedIn: 'root'
})
export class IntroGuard implements CanLoad {

  constructor(
    private router: Router,
    private storage: PreferencesService) { }
  
  async canLoad(): Promise<boolean> {
    const hasSeenIntro = await this.storage.getPreference(INTRO_KEY);
    if(hasSeenIntro && hasSeenIntro.value == 'true') {
      return true;
    } else {
      this.router.navigateByUrl('/intro', {replaceUrl: true});
      return true;
    }

  }
}
