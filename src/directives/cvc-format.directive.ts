import { Directive, ElementRef, HostListener, AfterViewChecked } from '@angular/core';
import { CreditCard } from '../shared/credit-card';

@Directive({
  selector: '[ccCVC]'
})

export class CvcFormatDirective{

  public target: any;
  
  constructor(private creditCard: CreditCard, private el: ElementRef) {
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
    if (!this.creditCard.restrictNumeric(e) && !this.creditCard.restrictCvc(e.which, this.target)) {
      e.preventDefault();
    }
  }
  @HostListener('paste', ['$event']) onPaste(e: any) {
    this.reformatCvc(e)
  }
  @HostListener('change', ['$event']) onChange(e: any) {
    this.reformatCvc(e)
  }
  @HostListener('input', ['$event']) onInput(e: any) {
    this.reformatCvc(e)
  }
  @HostListener('ionChange', ['$event']) onIonChange(e: any) {
    this.reformatCvc(e);
  }  
  @HostListener('ionBlur', ['$event']) onIonBlur(e: any) {
    this.reformatCvc(e);
  }


  private reformatCvc(e: any) {
    setTimeout(() => {
      let val = this.creditCard.replaceFullWidthChars(this.target.value);
      val = val.replace(/\D/g, '').slice(0, 4);
      this.target.selectionStart = this.target.selectionEnd = this.creditCard.safeVal(val, this.target);
      // Workaround for setting ion-input value same as the native input element.
      if (e._value) {
        e._value = val;
      }
    });
  }

}
