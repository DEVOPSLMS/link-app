import { Component, ElementRef, HostListener, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Subscription } from 'rxjs';
import { AuthService } from '../../service/auth.service';
import { AuthInterceptor } from '../../service/auth.interceptor';


@Component({
  selector: 'app-navbar',
  standalone: false,

  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit, OnDestroy {
  @ViewChild('accountIcon') accountIcon!: ElementRef;
  @ViewChild('card') card!: ElementRef;
  isCardVisible = false;
  isLoggedin: any;
  isVisible = false;
  private authSubscription: Subscription | null = null;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    
    this.checkUser();
  }
  public checkUser(){
    this.authService.isLoggedin$.subscribe((status:any)=>{
      this.isLoggedin=status;
    })
  }
  signOut() {
    this.authService.logout();
    this.isCardVisible=false;
  }
  showCard() {
    this.isCardVisible = true;
    
  }
  openLoginModal() {
    this.isVisible = true;
  }

  ngOnDestroy() {
    if (this.authSubscription) this.authSubscription.unsubscribe();
  }
  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent) {
    setTimeout(() => {
      // Get fresh references to elements
      const icon = this.accountIcon?.nativeElement;
      const card = this.card?.nativeElement;
   
      if (!icon || !card) return;
  
      // Check click location
      const clickedInside = icon.contains(event.target) || card.contains(event.target);
      
      // Close only if click is outside AND card is visible
      if (this.isCardVisible && !clickedInside) {
        this.isCardVisible = false;
      }
    }, 10); // Increased delay to ensure DOM updates
  }
}