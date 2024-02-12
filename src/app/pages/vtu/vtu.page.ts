import { CommonModule } from '@angular/common';
import { Component, NO_ERRORS_SCHEMA, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-vtu',
  templateUrl: './vtu.page.html',
  styleUrls: ['./vtu.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
  ],
  schemas: [NO_ERRORS_SCHEMA]
})
export class VtuPage implements OnInit {

  constructor(
    public router : Router
  ) { }

  ngOnInit() {
  }

  data(){
this.router.navigateByUrl('/vtu/data')
  }
  
  airtime(){
    this.router.navigateByUrl('/vtu/airtime')
      }

}
