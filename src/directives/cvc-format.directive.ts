import { Directive, ElementRef, HostListener, AfterViewChecked } from '@angular/core';
import { CreditCard } from '../shared/credit-card';

@Directive({
  selector: '[ccCVC]'
})

export class CvcFormatDirective implements AfterViewChecked{

  public target;

  constructor(private el: ElementRef) {
    // if (/(input|INPUT)/.exec(el.nativeElement.tagName)) {
    //   this.target = el.nativeElement;
    // } else {
    //   let inputs = el.nativeElement.getElementsByTagName('INPUT');
    //   this.target = inputs;
    // }
  }

  ngAfterViewChecked() {
    if (/(input|INPUT)/.exec(this.el.nativeElement.tagName)) {
      this.target = this.el.nativeElement;
    } else {
      let inputs = this.el.nativeElement.getElementsByTagName('INPUT');
      this.target = inputs[0];
    }
  }

  @HostListener('keypress', ['$event']) onKeypress(e) {
    if (!CreditCard.restrictNumeric(e) && !CreditCard.restrictCvc(e.which, this.target)) {
      e.preventDefault();
    }
  }
  @HostListener('paste', ['$event']) onPaste(e) {
    this.reformatCvc(e)
  }
  @HostListener('change', ['$event']) onChange(e) {
    this.reformatCvc(e)
  }
  @HostListener('input', ['$event']) onInput(e) {
    this.reformatCvc(e)
  }


  private reformatCvc(e) {
    setTimeout(() => {
      let val = CreditCard.replaceFullWidthChars(this.target.value);
      val = val.replace(/\D/g, '').slice(0, 4);
      this.target.selectionStart = this.target.selectionEnd = CreditCard.safeVal(val, this.target);
    });
  }

}
