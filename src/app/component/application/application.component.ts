import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-application',
  standalone: false,
  
  templateUrl: './application.component.html',
  styleUrl: './application.component.css'
})
export class ApplicationComponent {
  userClicked=false;
  click(){
    this.userClicked=true;
  }
}
