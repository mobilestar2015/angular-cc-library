import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { CreditCardValidator } from '../../src/credit-card.validator';

@Component({
  selector: 'app',
  template: require('./app.html')
})
export class AppComponent implements OnInit {
  demoForm: FormGroup;
  submitted: boolean = false;

  constructor(private creditCardValidator: CreditCardValidator, private _fb: FormBuilder) {}

  ngOnInit() {
    this.demoForm = this._fb.group({
      creditCard: ['', [<any>this.creditCardValidator.validateCCNumber]],
      expDate: ['', [<any>this.creditCardValidator.validateExpDate]],
      cvc: ['', [<any>Validators.required, <any>Validators.minLength(3), <any>Validators.maxLength(4)]] // TODO compare actual results against card type
    });
  }

  onSubmit(form) {
    this.submitted = true;
    console.log(form);
  }
}
