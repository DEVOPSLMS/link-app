import { ChangeDetectorRef, Component, EventEmitter, Output } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-modal',
  standalone: false,

  templateUrl: './login-modal.component.html',
  styleUrl: './login-modal.component.css'
})
export class LoginModalComponent {
 
  loginForm: FormGroup;
  constructor(private authService:AuthService,private fb:FormBuilder,private cdr:ChangeDetectorRef,private router:Router){
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }
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
  login(){
    if(this.loginForm.valid){
      this.authService.login(this.loginForm.value).subscribe({
        next:(response)=>{
          this.closeModal();
         
        },
        error:(error)=>{
          console.log(error);
        }
      })
    }
  }
 
}
