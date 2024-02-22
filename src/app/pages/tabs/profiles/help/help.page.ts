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
chat: any;

  // Function to load Tawk.to script
  loadTawkScript() {
    // Check if Tawk_API is already defined (script already loaded)
    this.isTawkChatLoaded = true;
  
  }

  constructor() { }

  ngOnInit() {

    this.chatUrl()
  }
  chatUrl(){
    this.chat = JSON.parse(localStorage.getItem('chat'));
    console.log(this.chat)
    
  }

  redirectToChat() {
    // Assuming this.chat contains the WhatsApp number
    this.chat = JSON.parse(localStorage.getItem('chat'));
    const whatsappUrl = 'https://wa.me/' + this.chat; // Construct the WhatsApp URL
    window.open(whatsappUrl, '_blank'); // Open the WhatsApp URL in a new tab
  }
  
}
