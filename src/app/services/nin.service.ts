import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class NinService {
  private readonly scanStatusKey = "scanStatus";
  private scanStatusSubject = new BehaviorSubject<boolean>(
    this.getInitialscanStatus()
  );

  scanStatus$ = this.scanStatusSubject.asObservable();

  constructor() {}

  private getInitialscanStatus(): boolean {
    const storedStatus = localStorage.getItem(this.scanStatusKey);
    return storedStatus ? JSON.parse(storedStatus) : false;
  }

  getscanStatus(): boolean {
    return this.scanStatusSubject.value;
  }

  setscanStatus(ninstatus: boolean) {
    localStorage.setItem(this.scanStatusKey, JSON.stringify(ninstatus));
    this.scanStatusSubject.next(ninstatus);
  }
}
