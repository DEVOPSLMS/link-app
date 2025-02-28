import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AuthService } from '../../../service/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError } from 'rxjs';

@Component({
  selector: 'app-verify-email',
  standalone: false,
  
  templateUrl: './verify-email.component.html',
  styleUrl: './verify-email.component.css'
})
export class VerifyEmailComponent implements OnInit{
  verify_email: FormGroup;
  email: string = '';
  verified=false;
  maskedEmail:string='';
  inputValue: number | null = null;
  isLoading = false;
  isLoadingResend=false;
  sendMessage:string='';
  errorMessage:string=''
  code:string='';
  constructor(private authService:AuthService,private fb:FormBuilder,private cdr:ChangeDetectorRef,private router:Router){
    this.verify_email = this.fb.group({
      code: ['', [Validators.required]],
      
    });
  }
  ngOnInit(): void {
    this.authService.getEmail().subscribe({
      next:(response:any)=>{
        
        
          this.email=response.email;
          this.maskedEmail=this.maskEmail(this.email);
        
      
      },
      error:(error:any)=>{
        
        this.router.navigateByUrl("/home");
      }
    })
    
  }
  verifyEmail(){
    this.isLoading=true;

    this.code=this.verify_email.get('code')?.value;
    this.authService.verifyEmail(this.email,(this.code)).subscribe({
      next:(response:any)=>{
        setTimeout(()=>{
          this.isLoading=false;
        },2000)
      },
      error:(error:any)=>{
  
        console.log(error);
        this.errorMessage=error.message;
        setTimeout(()=>{
          this.isLoading=false;
        },2000)
      }
    })
  }
  maskEmail(email: string): string {
    const [localPart, domain] = email.split('@');
    const maskedLocal = localPart[0] + '*'.repeat(Math.min(4, localPart.length - 1));
    const domainParts = domain.split('.');
    const maskedDomain = domainParts[0][0] + '*'.repeat(Math.min(4, domainParts[0].length - 1));
    return `${maskedLocal}@${maskedDomain}.${domainParts[1]}`;
  }
  
  enforceMaxLength(event: Event) {
    const input = event.target as HTMLInputElement;
    const value = input.value;

    // Restrict input to 6 digits
    if (value.length > 6) {
      input.value = value.slice(0, 6);
      this.inputValue = parseInt(input.value, 10);
    }
  }

  resendEmail(){
    this.isLoadingResend=true;
    this.authService.resendEmail(this.email).subscribe({
      next:(response)=>{
        setTimeout(() => {
          this.isLoadingResend = false;
          this.sendMessage="Code has been sent";
          console.log(this.isLoadingResend)
        }, 2000);
      },
      error:(error)=>{
        
        setTimeout(() => {
          this.isLoadingResend = false;
          
          console.log(this.isLoadingResend)
        }, 2000);
      }
    })
  }
}
