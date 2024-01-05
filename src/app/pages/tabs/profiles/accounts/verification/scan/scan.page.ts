import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-scan',
  templateUrl: './scan.page.html',
  styleUrls: ['./scan.page.scss'],
})
export class ScanPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }
upload(event: Event){
  const file = (event.target as HTMLInputElement).files[0];
  const sendData  = new FormData();
  sendData.append('nin', file)
  console.log(sendData)
}
}
