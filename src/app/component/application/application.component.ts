import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, Subscription } from 'rxjs';
import { CollectionService } from '../../service/collection.service';

@Component({
  selector: 'app-application',
  standalone: false,
  
  templateUrl: './application.component.html',
  styleUrl: './application.component.css'
})
export class ApplicationComponent implements OnInit,OnDestroy {
  constructor(private collectionService:CollectionService){}
  userClicked=false;
  private searchSubscription: Subscription;
  searchControl: FormControl = new FormControl();
  ngOnInit(): void {
   this.searchSubscription= this.searchControl.valueChanges
    .pipe(
      debounceTime(300), // Waits for 300ms pause in events
      distinctUntilChanged() // Only emit when the current value is different than the last
    )
    .subscribe(value => {
      this.performSearch(value);
    }); 
  }  
  performSearch(query: string) {
    // Replace with your service API call
    this.collectionService.searchCollection(query).subscribe(results => {
      console.log(results)
    });
  }
  click(){
    this.userClicked=true;
  }
  ngOnDestroy(): void {
    if (this.searchSubscription) {
      this.searchSubscription.unsubscribe();
    }
  }
  
}
