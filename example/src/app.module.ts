import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';

import { CreditCardFormatDirective } from '../../src/directives/credit-card-format.directive';
import { ExpiryFormatDirective } from '../../src/directives/expiry-format.directive';
import { CvcFormatDirective } from '../../src/directives/cvc-format.directive';
import { CreditCardValidator } from '../../src/credit-card.validator';

@NgModule({
  imports: [BrowserModule, ReactiveFormsModule, FormsModule],
  declarations: [
    AppComponent,
    CreditCardFormatDirective,
    ExpiryFormatDirective,
    CvcFormatDirective
  ],
  bootstrap: [AppComponent],
  providers: [CreditCardValidator]
})
export class AppModule {
}
