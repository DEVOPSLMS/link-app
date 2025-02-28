import { ChangeDetectorRef, Component, EventEmitter, Output } from '@angular/core';
import { AuthService } from '../../../service/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: false,
  
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm: FormGroup;
  constructor(private authService:AuthService,private fb:FormBuilder,private cdr:ChangeDetectorRef,private router:Router){
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }
  isVisible = false;
  password: string = '';
  showPassword: boolean = false;
  isLoading = false;
  errorMessage:string='';

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
      this.isLoading = true;
      this.authService.login(this.loginForm.value).subscribe({
        next:(response)=>{
         
          setTimeout(() => {
            this.isLoading = false;
            this.closeModal();
            this.loginForm.reset();
            this.errorMessage='';
            this.router.navigate(['/app']);
          }, 2000);
        },
        error:(error)=>{
          console.log(error);
         
          setTimeout(() => {
            this.isLoading = false;
            this.errorMessage=error.message;
          }, 2000);
        }
      })
    }
  }
}
