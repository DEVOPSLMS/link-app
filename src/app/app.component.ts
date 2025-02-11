import { Component, OnInit } from '@angular/core';
import { AuthService } from './service/auth.service';
import { catchError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  constructor(private authService:AuthService){

  }
  title = 'link-app';
  ngOnInit(): void {
    this.authService.verifyUser().subscribe({})
      
    
  }
}
