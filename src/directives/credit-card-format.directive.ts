import { Directive, ElementRef, HostListener } from '@angular/core';
import { CreditCard } from '../shared/credit-card';

@Directive({
  selector: '[ccNumber]'
})

export class CreditCardFormatDirective {

  public target: any;
  private cards: Array<any>;

  constructor(private creditCard: CreditCard, private el: ElementRef) {
    if (/^(input|INPUT)$/.exec(el.nativeElement.tagName)) {
      this.target = el.nativeElement;
    } else {
      this.target = this.el.nativeElement.getElementsByTagName('input');
    }   

    this.cards = this.creditCard.cards;
  }

  ngAfterViewInit() {
    if (/^(input|INPUT)$/.exec(this.el.nativeElement.tagName)) {
      this.target = this.el.nativeElement;
    } else {
      let inputs = this.el.nativeElement.getElementsByTagName('INPUT');
      this.target = inputs[0];
    }
  }

  @HostListener('keypress', ['$event']) onKeypress(e: any) {
    if (this.creditCard.restrictNumeric(e)) {
      if (this.creditCard.isCardNumber(e.which, this.target)) {
        this.formatCardNumber(e);
      }
    } else {
      e.preventDefault();
      return false;
    }
  }
  @HostListener('keydown', ['$event']) onKeydown(e: any) {
    this.formatBackCardNumber(e);
  }
  @HostListener('keyup', ['$event']) onKeyup(e: any) {
    this.setCardType(e);
  }
  @HostListener('paste', ['$event']) onPaste(e: any) {
    this.reFormatCardNumber(e);
  }
  @HostListener('change', ['$event']) onChange(e: any) {
    this.reFormatCardNumber(e);
  }
  @HostListener('input', ['$event']) onInput(e: any) {
    this.reFormatCardNumber(e);
    this.setCardType(e);
  }
  @HostListener('ionChange', ['$event']) onIonChange(e: any) {
    this.reFormatCardNumber(e);
    this.setCardType(e);
  }
  @HostListener('ionBlur', ['$event']) onIonBlur(e: any) {
    this.reFormatCardNumber(e);
    this.setCardType(e);    
  }

  private formatCardNumber(e: any) {
    let card: any,
        digit: string,
        length: number,
        re: any,
        upperLength: number,
        value: string;

    digit = String.fromCharCode(e.which);
    if (!/^\d+$/.test(digit)) {
      return;
    }

    value = this.target.value;

    card = this.creditCard.cardFromNumber(value + digit);

    length = (value.replace(/\D/g, '') + digit).length;

    upperLength = 16;

    if (card) {
      upperLength = card.length[card.length.length - 1];
    }

    if (length >= upperLength) {
      return;
    }

    if ((this.target.selectionStart != null) && this.target.selectionStart !== value.length) {
      // return;
    }

    if (card && card.type === 'amex') {
      re = /^(\d{4}|\d{4}\s\d{6})$/;
    } else {
      re = /(?:^|\s)(\d{4})$/;
    }

    if (re.test(value)) {
      e.preventDefault();
      setTimeout(() => {
        this.target.value = `${value} ${digit}`;
      });
    } else if (re.test(value + digit)) {
      e.preventDefault();
      setTimeout(() => {
        this.target.value = `${value}${digit} `;
      });
    }
  }

  private formatBackCardNumber(e: any) {
    let value = this.target.value;

    if (e.which !== 8) {
      return;
    }

    if ((this.target.selectionStart != null) && this.target.selectionStart !== value.length) {
      // return;
    }

    if (/\d\s$/.test(value)) {
      e.preventDefault();
      setTimeout(() => {
        this.target.value = value.replace(/\d\s$/, '');
      });
    } else if (/\s\d?$/.test(value)) {
      e.preventDefault();
      setTimeout(() => {
        this.target.value = value.replace(/\d$/, '');
      });
    }
}

  private setCardType(e: any) {
    let card: any,
        val      = this.target.value,
        cardType = this.creditCard.cardType(val) || 'unknown';

    if (!this.target.classList.contains(cardType)) {
      let ionInputElem = e._elementRef;
      for (let i = 0, len = this.cards.length; i < len; i++) {
        card = this.cards[i];
        this.target.classList.remove(card.type);
        if (ionInputElem) {
          ionInputElem.nativeElement.classList.remove(card.type);
        }
      }

      this.target.classList.remove('unknown');
      this.target.classList.add(cardType);
      this.target.classList.toggle('identified', cardType !== 'unknown');
      
      if (ionInputElem) {
        ionInputElem.nativeElement.classList.remove('unknown');
        ionInputElem.nativeElement.classList.add(cardType);
        ionInputElem.nativeElement.classList.toggle('identified', cardType !== 'unknown');
      }
    }
  }

  private reFormatCardNumber(e: any) {
    setTimeout(() => {
      let value = this.creditCard.replaceFullWidthChars(this.target.value);
      value = this.creditCard.formatCardNumber(value);
      this.target.selectionStart = this.target.selectionEnd = this.creditCard.safeVal(value, this.target);
      // Workaround for setting ion-input value same as the native input element.
      if (e._value) {
        e._value = value;
      }
    });
  }

}
