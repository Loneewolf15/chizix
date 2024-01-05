import { Injectable } from '@angular/core';
import { FingerprintAIO } from '@ionic-native/fingerprint-aio/ngx';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FingerprintAuthService {
  constructor(private fingerprint: FingerprintAIO, private http: HttpClient) { }

  async authenticate() {
    try {
      const isAvailable = await this.fingerprint.isAvailable();
      if (isAvailable) {
        const result = await this.fingerprint.show({
          title: 'Authenticate with Fingerprint',
          subtitle: 'Touch the fingerprint scanner',
          description: 'This app uses biometric authentication to log you in',
          fallbackButtonTitle: 'Use password',
          disableBackup: true,
          cancelButtonTitle: 'Cancel',
          // Customize colors
          // backgroundColor: '#F2F2F2',
          // textColor: '#000000',
          // buttonColor: '#000000',
          // buttonDisabledColor: '#CCCCCC'
        
        });
        const response = await this.http.post('/api/login', { fingerprint: result.token }).toPromise();
        return response;
      } else {
        throw new Error('Fingerprint authentication is not available on this device');
      }
    } catch (error) {
      throw new Error('Fingerprint authentication failed');
    }
  }
}
