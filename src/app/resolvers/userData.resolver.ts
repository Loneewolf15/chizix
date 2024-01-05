import { Injectable } from '@angular/core';
import { AuthService } from '../services/auth.service';



@Injectable({
    providedIn: 'root'
  })

  export class UserDataResolver {

    constructor(
        private authService: AuthService
    ){}

    resolve(){
        console.log('Goes home');
       // console.log(this.authService.getUserData);
        
        return this.authService.getUserData();
    }
  }