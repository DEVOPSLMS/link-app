import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-email-verified',
  standalone: false,
  
  templateUrl: './email-verified.component.html',
  styleUrl: './email-verified.component.css'
})
export class EmailVerifiedComponent implements OnInit{
  private sub: any;
  code: string = '';
  email: string = '';
  verified= false;
  constructor(private authService:AuthService,private route:ActivatedRoute){

  }
  ngOnInit(): void {
    this.sub = this.route.params.subscribe(params => {
      this.code=params['code'];
      this.email=params['email'];
      this.authService.verifyEmail(this.code,this.email).subscribe({
        next:(response:any)=>{
          this.verified=true;
        },
        error:(error:any)=>{
          console.log(error);
        }
      })
    })
   
  }
}
