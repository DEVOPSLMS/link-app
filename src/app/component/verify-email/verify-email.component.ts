import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

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
  constructor(private authService:AuthService,private fb:FormBuilder,private cdr:ChangeDetectorRef,private router:Router){
    this.verify_email = this.fb.group({
      code: ['', [Validators.required]],
      
    });
  }
  ngOnInit(): void {
    this.email=sessionStorage.getItem("email");
    
  }
  verifyEmail(){

    this.authService.verifyEmail(this.verify_email.get('code')?.value,this.email).subscribe({
      next:(response:any)=>{
        this.verified=true;
        sessionStorage.removeItem("email");
      },
      error:(error:any)=>{
        console.log(error);
      }
    })
  }
}
