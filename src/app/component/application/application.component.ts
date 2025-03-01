import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, Subscription } from 'rxjs';
import { CollectionService } from '../../service/collection.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-application',
  standalone: false,

  templateUrl: './application.component.html',
  styleUrl: './application.component.css',
})
export class ApplicationComponent implements OnInit, OnDestroy {
  constructor(
    private collectionService: CollectionService,
    private router: Router,
    private route: ActivatedRoute
  ) {}
  userClicked = false;
  private searchSubscription: Subscription;
  searchControl: FormControl = new FormControl();
  searchDetails:any;
  ngOnInit(): void {
    this.searchSubscription = this.searchControl.valueChanges
      .pipe(
        debounceTime(300), // Waits for 300ms pause in events
        distinctUntilChanged() // Only emit when the current value is different than the last
      )
      .subscribe((value) => {
        this.performSearch(value);
      });
    this.route.queryParams.subscribe((params) => {
      this.userClicked = params['collection'] === 'true';
    });
  }
  performSearch(query: string) {
    // Replace with your service API call
    this.collectionService.searchCollection(query).subscribe((results) => {
      this.searchDetails=results;
    });
  }
  click() {
    if (this.userClicked) {
      this.router.navigate([], {
        relativeTo: this.route,
        queryParams: {},
      });
    } else {
      this.router.navigate([], {
        relativeTo: this.route,
        queryParams: { collection: true },
        queryParamsHandling: 'merge',
      });
    }
  }
  ngOnDestroy(): void {
    if (this.searchSubscription) {
      this.searchSubscription.unsubscribe();
    }
  }
}
