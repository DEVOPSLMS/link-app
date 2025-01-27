import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  standalone: false,
  
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
   refresh_token :any;
   isVisible=false;
  ngOnInit(): void {
    this.refresh_token= 'false';
  }
  openLoginModal(){
    this.isVisible=true;
  }
}
