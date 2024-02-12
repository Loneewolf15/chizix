import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class InactivityService {

  constructor() { }

  private inactivityTimer: any;
  private readonly inactivityTime: number = 1000000000; // 10 minutes in milliseconds 600000

startInactivityTimer(): Observable<any> {
  return new Observable((observer) => {
    this.inactivityTimer = setTimeout(() => {
     
      localStorage.removeItem('userData');
      localStorage.removeItem('res');
      localStorage.removeItem('accessT'); // replace 'myData' with the name of your data
      observer.next();
      observer.complete();
      console.log('Removing Items');
      // alert('Removing Items');
    }, this.inactivityTime);
  });
}

}
