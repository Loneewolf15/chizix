import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-wallets',
  templateUrl: './wallets.page.html',
  styleUrls: ['./wallets.page.scss'],
  standalone: true,
  imports: [ CommonModule,
    FormsModule,
    IonicModule,]
})
export class WalletsPage implements OnInit {

  allTransactions: any[] = [];
  transactions: any[] = [];
  segmentValue = 'in';

  constructor(
    public router : Router,
  ) { }

  ngOnInit() {
    this.allTransactions = [
      { id: 1, to: 'Godwin Gheli.', date: '2022-05-22', amount: 5000 },
      { id: 2, to: 'Anelson Dickson', date: '2022-03-02', amount: 7000 },
      { id: 3, to: 'Yahayah Hephzibahh', date: '2022-07-28', amount: -3250 },
      { id: 4, to: 'Wisdom Omoregbee.', date: '2022-01-09', amount: 1000 },
      { id: 5, to: 'Emmanuel Babalola', date: '2022-04-13', amount: -800 },
    ];
    this.filterTransactions();
  }

  filterTransactions() {
    if(this.segmentValue == 'in') {
      this.transactions = this.allTransactions.filter(x => x.amount >= 0);
    } else {
      this.transactions = this.allTransactions.filter(x => x.amount < 0);
    }
  }

  segmentChanged(event) {
    console.log(event);
    this.segmentValue = event.detail.value;
    this.filterTransactions();
  }

  withdrawal(){
this.router.navigateByUrl('/withdrawal')
  }

  deposit(){
    this.router.navigateByUrl('/deposit')
  }

  vtu(){
    this.router.navigateByUrl('/vtu')
  }

  airtime(){
    this.router.navigateByUrl('/vtu/airtime')
  }

  data(){
    this.router.navigateByUrl('/vtu/data')
  }
  
}
