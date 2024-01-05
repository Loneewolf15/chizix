import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppLaunchService {
  private appLaunched = false;

  constructor() { }

  setAppLaunched() {
    this.appLaunched = true;
  }

  isAppLaunched(): boolean {
    return this.appLaunched;
  }
}
