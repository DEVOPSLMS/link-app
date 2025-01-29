import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-login-modal',
  standalone: false,

  templateUrl: './login-modal.component.html',
  styleUrl: './login-modal.component.css'
})
export class LoginModalComponent {
  isVisible = false;
  password: string = '';
  showPassword: boolean = false;

  @Output() closed = new EventEmitter<void>();
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
 
  openModal(): void {
    this.isVisible = true;
  }

  closeModal(): void {
    this.isVisible = false;
    this.closed.emit();
  }
 
}
