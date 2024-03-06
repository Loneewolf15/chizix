import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonTabs, IonicModule } from '@ionic/angular';
import { NativeAudio } from '@capacitor-community/native-audio';


@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule]
})
export class TabsPage implements OnInit {
  isTabChanged = false;
  @ViewChild('tabs', {static: false}) tabs: IonTabs;
  selectedTab: any;

  constructor() { }

  ngOnInit() {
  }

  async setCurrentTab() {
    this.selectedTab = this.tabs.getSelected();
    console.log(this.selectedTab);
    await this.playAudio();
  }
  
  async playAudio() {
    try {
      if(this.isTabChanged) {
        await NativeAudio.play({
          assetId: 'notification',
          // time: 6.0 - seek time
        });
      } else {
        this.isTabChanged = true;
      }
    } catch(e) {
      console.log(e);
    }
    
  }
}