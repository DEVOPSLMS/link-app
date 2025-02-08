import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  standalone: false,
  
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent implements OnInit{
  
  registerForm: FormGroup;
  errorMessage:string='';
  hasUpperCase = false;
  hasLowerCase = false;
  hasNumber = false;
  hasSpecialChar = false;
  isValidLength = false;
  constructor(private authService:AuthService,private router:Router,private fb:FormBuilder){
     this.registerForm = this.fb.group({
          email: ['', [Validators.required, Validators.email]],
          FirstName: ['', [Validators.required,]],
          LastName: ['', [Validators.required]],
          password: ['', [Validators.required,this.passwordComplexityValidator()]],
          confirmPassword: ['', [Validators.required,this.confirmPasswordValidator('password')]]
        });
  }
  ngOnInit(): void {
    this.registerForm.get('password')?.valueChanges.subscribe(value => {
      this.hasUpperCase = /[A-Z]+/.test(value);
      this.hasLowerCase = /[a-z]+/.test(value);
      this.hasNumber = /[0-9]+/.test(value);
      this.hasSpecialChar = /[!@#$%^&*()_+\-=\[\]{};':",\\|,.<>\/?]+/.test(value);
      this.isValidLength = value.length >= 8;
    });
  }
  showPassword: boolean = false;
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
  signUp(){
    // this.authService.register()
    console.log("hello")
    if(this.registerForm.valid){
     
      this.authService.register(this.registerForm.get('email')?.value,this.registerForm.get('FirstName')?.value,this.registerForm.get('LastName')?.value,
      this.registerForm.get('password')?.value,'user').subscribe({
        next(response){
          console.log(response);
          
        }
      })
    }
  }
   passwordComplexityValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const password = control.value;
  
      if (!password) { // Allow empty passwords (handled by required validator)
        return null;
      }
  
      const hasUpperCase = /[A-Z]+/.test(password);
      const hasLowerCase = /[a-z]+/.test(password);
      const hasNumber = /[0-9]+/.test(password);
      const hasSpecialChar = /[!@#$%^&*()_+\-=\[\]{};':",\\|,.<>\/?]+/.test(password);
      const isValidLength = password.length >= 8;
  
      const isValid = hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar && isValidLength;
  
      return isValid ? null : { 'passwordComplexity': true };
    };
  }
  confirmPasswordValidator(passwordControlName: string): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const passwordControl = control.parent?.get(passwordControlName); // Get password control
  
      if (passwordControl?.value === control.value) {
        return null;
      } else {
        return { 'confirmPasswordMismatch': true };
      }
    };
  }
}
