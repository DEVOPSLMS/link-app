import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: false,
  
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  otpInputs = new Array(6); // Number of OTP digits
  otp: string[] = Array(6).fill(''); // Array to hold OTP values

  moveToNext(event: any, index: number): void {
    const input = event.target;
    const value = input.value;

    if (value && index < this.otpInputs.length - 1) {
      const nextInput = input.nextElementSibling;
      nextInput?.focus(); // Move to next input
    } else if (!value && index > 0 && event.inputType === 'deleteContentBackward') {
      const prevInput = input.previousElementSibling;
      prevInput?.focus(); // Move to previous input if backspacing
    }
  }
  handleKeydown(event: KeyboardEvent, index: number): void {
    const input = event.target as HTMLInputElement;

    // Move focus to previous input if Backspace is pressed and the current input is empty
    if (event.key === 'Backspace' && !this.otp[index]) {
      const prevInput = input.previousElementSibling as HTMLInputElement;
      prevInput?.focus();
    }

    // Allow typing after backspacing
    if (event.key !== 'Backspace') {
      return;
    }
  }
}
