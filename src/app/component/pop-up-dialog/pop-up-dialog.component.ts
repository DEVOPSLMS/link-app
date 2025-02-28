import { animate, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';

@Component({
  selector: 'app-pop-up-dialog',
  standalone: false,
   animations: [
      trigger('fadeInOut', [
        transition(':enter', [
          // Fade in
          style({ opacity: 0 }),
          animate('300ms ease-in', style({ opacity: 1 })),
        ]),
        transition(':leave', [
          // Fade out
          animate('300ms ease-out', style({ opacity: 0 })),
        ]),
      ]),
    ],
  templateUrl: './pop-up-dialog.component.html',
  styleUrl: './pop-up-dialog.component.css'
})
export class PopUpDialogComponent {
  popup: boolean = false;
  private timeoutId: any;
  showPopup() {
    this.popup = true;
    clearTimeout(this.timeoutId);
    this.timeoutId = setTimeout(() => {
      this.popup = false;
    }, 3000);
  }
}
