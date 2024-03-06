import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  private readonly uploadStatusKey = 'uploadStatus';
  private uploadStatusSubject = new BehaviorSubject<boolean>(this.getInitialUploadStatus());

  uploadStatus$ = this.uploadStatusSubject.asObservable();

  constructor() {}

  private getInitialUploadStatus(): boolean {
    const storedStatus = localStorage.getItem(this.uploadStatusKey);
    return storedStatus ? JSON.parse(storedStatus) : false;
  }

  getUploadStatus(): boolean {
    return this.uploadStatusSubject.value;
  }

  setUploadStatus(status: boolean) {
    localStorage.setItem(this.uploadStatusKey, JSON.stringify(status));
    this.uploadStatusSubject.next(status);
  }
}
