import { NgModule } from '@angular/core';

import { CreditCardFormatDirective } from './directives/credit-card-format.directive';
import { ExpiryFormatDirective } from './directives/expiry-format.directive';
import { CvcFormatDirective } from './directives/cvc-format.directive';
import { CreditCard } from './shared/credit-card';
import { CreditCardValidator } from './credit-card.validator';

const CREDIT_CARD_LIBRARY_DIRECTIVES = [
  CreditCardFormatDirective,
  ExpiryFormatDirective,
  CvcFormatDirective
];

@NgModule({
  declarations: [CREDIT_CARD_LIBRARY_DIRECTIVES],
  exports: [CREDIT_CARD_LIBRARY_DIRECTIVES, CreditCardValidator],
  providers: [CreditCard, CreditCardValidator]
})
export class CreditCardDirectivesModule {
}
