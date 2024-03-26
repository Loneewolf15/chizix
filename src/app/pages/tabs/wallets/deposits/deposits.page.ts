import { Component, OnInit } from '@angular/core';

import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-deposits',
  templateUrl: './deposits.page.html',
  styleUrls: ['./deposits.page.scss'],
//  providers: [NgControl],
})


export class DepositsPage implements OnInit {
  amount: number;
  topUpForm: FormGroup;
  

  constructor(private fb: FormBuilder,
    // private paymentService: PaymentService
    ) {

    

    // this.topUpForm = this.fb.group({
    //   amount: ['', [Validators.required, Validators.min(1)]],
    //   cardNumber: ['', [Validators.required, Validators.pattern('[0-9]{16}')]],
    //   expiryMonth: ['', [Validators.required, Validators.min(1), Validators.max(12)]],
    //   expiryYear: ['', [Validators.required, Validators.min(new Date().getFullYear()), Validators.max(new Date().getFullYear() + 10)]],
    //   cvv: ['', [Validators.required, Validators.pattern('[0-9]{3,4}')]]
    // });
  }

  ngOnInit() {
    this.topUpForm = new FormGroup({
      amount: new FormControl(null, {validators: [Validators.required, Validators.minLength(2)]}),

      cardNumber: new FormControl(null, {validators: [Validators.required, Validators.pattern('[0-9]{16}')]}),

      expiryMonth: new FormControl(null, {validators: [Validators.required, Validators.min(1), Validators.max(12)]}),

      expiryYear: new FormControl(null, {validators: [Validators.required, Validators.min(new Date().getFullYear()), Validators.max(new Date().getFullYear() + 10)]}),
    
      cvv: new FormControl(null, {validators: [Validators.required, Validators.pattern('[0-9]{3,4}')]})
    });
  }


   get amountx() {
    return this.topUpForm.get('amount');
  }

  get cardNumber() {
    return this.topUpForm.get('cardNumber');
  }

  get expiryMonth() {
    return this.topUpForm.get('expiryMonth');
  }

  get expiryYear() {
    return this.topUpForm.get('expiryYear');
  }

  get cvv() {
    return this.topUpForm.get('cvv');
  }

  // topUpWallet() {
  //   if (this.topUpForm.valid) {
  //     this.paymentService.processPayment(this.amount.value, this.cardNumber.value, this.expiryMonth.value, this.expiryYear.value, this.cvv.value)
  //       .subscribe(response => {
  //         // Handle successful payment response
  //       }, error => {
  //         // Handle payment error
  //       });
  //   }
  // }

}
