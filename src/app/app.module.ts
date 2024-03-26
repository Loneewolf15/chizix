import { CurrencyPipe } from '@angular/common';
import { HostListener, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { Printer, PrintOptions } from '@ionic-native/printer/ngx';
import { Clipboard } from '@ionic-native/clipboard/ngx';
//import { CapacitorSplashScreen } from '@capacitor/splash-screen';
import { FormsModule  } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { InactivityService } from './services/inactivity.service';



@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, FormsModule, HttpClientModule,   ReactiveFormsModule,],
  providers: [Printer,  CurrencyPipe, BarcodeScanner, Clipboard, StatusBar, SplashScreen, HttpClientModule,{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {

constructor( private inactivityService: InactivityService,){}
  @HostListener('document:mousemove') resetInactivityTimer() {
    this.inactivityService.startInactivityTimer().subscribe();
  }
}
