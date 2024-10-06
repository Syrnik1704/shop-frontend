import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: 'input[appInputOnlyNumber]'
})
export class InputOnlyNumberDirective {

  constructor(private element: ElementRef) {}

  @HostListener('input', ['$event']) onInputChange(event: Event) {
    const initialValue = this.element.nativeElement.value;
    this.element.nativeElement.value = initialValue.replace(/[^0-9]/g, '');

    if (initialValue > 300 || initialValue < 1) {
      this.element.nativeElement.value = 1;
    }
  }

}
