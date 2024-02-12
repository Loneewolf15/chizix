import { enableProdMode, importProvidersFrom } from '@angular/core';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';
import { environment } from './environments/environment';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CurrencyPipe } from '@angular/common';
import { StatusBar } from '@capacitor/status-bar';
import { defineCustomElements } from '@ionic/pwa-elements/loader';

// Call the element loader before the bootstrapModule/bootstrapApplication call
defineCustomElements(window);

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },

    CurrencyPipe,
    Clipboard,  
    HttpClientModule,

    importProvidersFrom(IonicModule.forRoot({}),
    BrowserModule,
    FormsModule, 
    HttpClientModule,   
    ReactiveFormsModule
    ),
    provideRouter(routes),
  ],
});