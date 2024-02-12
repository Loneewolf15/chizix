import { CommonModule, DatePipe } from '@angular/common';
import { Component, NO_ERRORS_SCHEMA, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController, ModalController, IonicModule } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { PreferencesService } from 'src/app/services/storage.service';
import { ToastService } from 'src/app/services/toast.service';
import { interval } from 'rxjs';
import { take } from 'rxjs/operators';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.page.html',
  styleUrls: ['./transactions.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
  ],
  providers: [DatePipe],
  schemas: [NO_ERRORS_SCHEMA]
})
export class TransactionsPage implements OnInit {
  transactionx: any[] = [];
  allTransactions: any[] = [];
  allTransactionx: any[] = [];
  transactions: any[] = [];
  userData: any;
  selectedTransaction: any;
  isModalOpen = false;
  segmentValue = 'in';

  constructor(
    private authService: AuthService,
    public router : Router,
    private toastController: ToastController,
    private storage: PreferencesService,
    private toastService: ToastService,
    private datePipe: DatePipe,
    private modalController: ModalController,
    
  ) { 
    this.getTransactions();
    this.filterTransactionx();
  }

  async presentToast(message: string, color: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      position: 'bottom',
      color: color
    });
    toast.present();
  }

  fetchUserData(){
    const userDataString = localStorage.getItem('userData');
    if (userDataString) {
      this.userData = JSON.parse(userDataString);
    }
  }

 

  getTransactions() {
    this.authService.getTransactions().subscribe((res: any) => {
   
      if (res.message === "Signature verification failed" && this.router.url !== '/auth-screen') {
        localStorage.removeItem('userData');
        localStorage.removeItem('res');
        localStorage.removeItem('accessT');
        this.toastController.create();
        this.presentToast('Session Expired.....Logging out', 'danger');
        this.router.navigateByUrl('/auth-screen');
      } else {
        
        
        // const mergedArray = [...res.inapp, ...res.vtu, ...res.deposit, ...res.withdrawal];
        // console.log(mergedArray);
  
        this.transactionx = res;
        }
        
        console.log(this.transactionx);
      
    });
  }
  
  ngOnInit() {
    
    // Run getTransactions() every 20 seconds
    interval(20000) // 20 seconds in milliseconds
      .pipe(take(1)) // Run the observable only once
      .subscribe(() => this.getTransactions());

   // Run filterTransactionx() every 22 seconds
   interval(22000) // 20 seconds in milliseconds
   .pipe(take(1)) // Run the observable only once
   .subscribe(() => this.filterTransactionx());
    this.allTransactions = [
      { id: 1, to: 'Victor Divine.', date: '2022-05-22', amount: 5000 },
      { id: 2, to: 'Dickson', date: '2022-03-02', amount: 7000 },
      { id: 3, to: 'Ighodalo', date: '2022-07-28', amount: -3250 },
      { id: 4, to: 'Veronica William.', date: '2022-01-09', amount: 1000 },
      { id: 5, to: 'osaro Godwin.', date: '2022-04-13', amount: -800 },
    ];
    this.getTransactions();
    this.filterTransactionx();
  }

  filterTransactions() {
    if(this.segmentValue == 'in') {
      this.transactions = this.allTransactions.filter(x => x.amount >= 0);
    } else {
      this.transactions = this.allTransactions.filter(x => x.amount < 0);
    }
  }


  filterTransactionx() {
    if(this.segmentValue == 'in') {
      this.transactionx = this.allTransactionx.filter(x => 
        x.sender_name !== JSON.parse(localStorage.getItem('userData'))?.loginData.full_name);
        console.log(this.transactionx);
    } else {
      this.transactionx = this.allTransactionx.filter(x => x.sender_name === JSON.parse(localStorage.getItem('userData'))?.loginData.full_name);
      console.log(this.transactionx);
      
      console.log(`I am ${JSON.stringify(this.transactionx)}`)
    }
  }

 
  getThumbnailImage(transaction: any): string {
    if (this.segmentValue === 'in') {
      return 'assets/imgs/received.png';
    } else {
      return 'assets/imgs/sent.png';
    }
  }
  
  getTransactionName(transaction: any): string {
    if (this.segmentValue === 'in') {
      return transaction.receiver_name === this.userData?.loginData.full_name ? transaction.receiver_name : transaction.sender_name;
    } else {
      return transaction.sender_name === this.userData?.loginData.full_name ? transaction.sender_name : transaction.receiver_name;
    }
  }
  
  segmentChanged(event) {
    console.log(event);
    this.segmentValue = event.detail.value;
    this.filterTransactionx();
  }


  setOpen(transaction: any) {
    this.selectedTransaction = transaction;
    this.isModalOpen = true;

    // Send response to the frontend
    console.log('Transaction selected:', transaction);
  }

  closeModal() {
    this.isModalOpen = false;
  }

}
