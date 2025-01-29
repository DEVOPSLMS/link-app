import { Directive, ElementRef, Output, EventEmitter, HostListener } from '@angular/core';

@Directive({
    standalone: true,
  selector: '[appOutSideClick]'
})
export class OutSideClickDirective {
  @Output() clickedOutside = new EventEmitter<void>();

  constructor(private elementRef: ElementRef) {}

  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent): void {
    const clickedInside = this.elementRef.nativeElement.contains(event.target);
    if (!clickedInside) {
      this.clickedOutside.emit();
    }
  }
}