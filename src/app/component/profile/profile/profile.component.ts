import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../../../service/auth.service';
import { Router } from '@angular/router';
import { Subject, Subscription, takeUntil } from 'rxjs';

@Component({
  selector: 'app-profile',
  standalone: false,
  
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit, OnDestroy{
  constructor(private authService:AuthService,private router:Router){}
  private subscription: Subscription;
   private destroy$ = new Subject<void>();
   profileDetails:any;
  ngOnInit(): void {
    this.authService.getProfile().pipe(takeUntil(this.destroy$)).subscribe({
   
      next:(response:any)=>{
        this.profileDetails=response;
        console.log(this.profileDetails)
      },
      error:(error:any)=>{
        this.router.navigateByUrl("/app");
      }
    })
  }
  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
      this.destroy$.next();
      this.destroy$.complete();
    }
  }
}
