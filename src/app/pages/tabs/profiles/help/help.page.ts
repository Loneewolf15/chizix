import { CommonModule } from '@angular/common';
import { Component, OnInit, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-help',
  templateUrl: './help.page.html',
  styleUrls: ['./help.page.scss'],
  standalone: true,
  imports: [ CommonModule,
    FormsModule,
    IonicModule,],
    schemas: [NO_ERRORS_SCHEMA], 
})
export class HelpPage implements OnInit {
  isTawkChatLoaded: boolean = false;


  // Function to load Tawk.to script
  loadTawkScript() {
    // Check if Tawk_API is already defined (script already loaded)
    this.isTawkChatLoaded = true;
  
  }

  constructor() { }

  ngOnInit() {
  }

}
