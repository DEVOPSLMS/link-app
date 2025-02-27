import {
  Component,
  ElementRef,
  HostListener,
  inject,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { CollectionService } from '../../../service/collection.service';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ArrayDataSource } from '@angular/cdk/collections';
import { NestedTreeControl } from '@angular/cdk/tree';
import { Subject, Subscription, takeUntil } from 'rxjs';
import { animate, style, transition, trigger } from '@angular/animations';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

takeUntil;
@Component({
  selector: 'app-collection',
  standalone: false,
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        // Fade in
        style({ opacity: 0 }),
        animate('300ms ease-in', style({ opacity: 1 })),
      ]),
      transition(':leave', [
        // Fade out
        animate('300ms ease-out', style({ opacity: 0 })),
      ]),
    ]),
  ],
  templateUrl: './collection.component.html',
  styleUrl: './collection.component.css',
})
export class CollectionComponent implements OnInit, OnDestroy {
  @ViewChild('exampleBox') exampleBox!: ElementRef;
  @ViewChild('leftContainer') leftContainer!: ElementRef;
  router = inject(Router);
  fb = inject(FormBuilder);
  addCollectionForm: FormGroup;
  items: any;
  isVisible = false;
  isSubCollection: any;
  activeItemId: string | null = null;
  userClicked: any;
  collectionName: any;
  collectionId: string = '';
  private timeoutId: any;
  private subscription: Subscription;
  private destroy$ = new Subject<void>();
  popup: boolean = false;
  safeHtml: SafeHtml;

  constructor(
    private sanitizer: DomSanitizer,
    private collectionService: CollectionService,
    private route: ActivatedRoute
  ) {
    this.addCollectionForm = this.fb.group({
      name: ['', [Validators.required]],
    });
  }

  // This method gets the collection of the user based on Id
  ngOnInit(): void {
    this.loadCollections();
    this.route.queryParams.subscribe((params) => {
      this.userClicked = params['collection'] === 'true';
      this.collectionId = params['collectionId'] || '';
      if (this.collectionId) {
        this.activeItemId = this.collectionId;
        this.collectionName = this.items.find(
          (item: any) => item.id === this.activeItemId
        ).collectionName;
      }
    });
  }
  loadCollections() {
    this.subscription = this.collectionService
      .getCollection()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          this.items = response;
          console.log('collections', this.items);
        },
        error: (err) => {
          console.log('Error fetching collections', err);
        },
      });
    this.loadItems();
  }

  trackByFn(index: number, item: any): number {
    return item.id; // or any unique identifier
  }

  saveItems() {
    localStorage.setItem('items', JSON.stringify(this.items));
  }
  loadItems() {
    const savedItems = localStorage.getItem('items');
    if (savedItems) {
      this.items = JSON.parse(savedItems);
    }
  }
  toggleChildren(item: any) {
    item.showChildren = !item.showChildren;
  }

  toggleNestedInput(event: MouseEvent, targetItem: any) {
    event.stopPropagation();
    this.resetNestedInputs(this.items);
    targetItem.showNestedInput = !targetItem.showNestedInput;
    targetItem.newNestedName = ''; // Reset input value
  }
  resetNestedInputs(items: any[]): void {
    items.forEach((item) => {
      item.showNestedInput = false;
      if (item.childCollections?.length) {
        this.resetNestedInputs(item.childCollections);
      }
    });
  }
  addNestedCollection(item: any) {
    this.collectionService
      .addCollection(this.addCollectionForm.get('name')?.value)
      .subscribe({
        next: (response: any) => {
          const newCollection = response;

          // Initialize properties if necessary
          newCollection.childCollections = [];
          newCollection.showNestedInput = false;

          // Add the new collection to the parent item's childCollections array
          item.showNestedInput = !item.showNestedInput;
          item.newNestedName = ''; // Reset input value
          this.items.push(newCollection);
          // Optionally, clear the form input
          this.addCollectionForm.reset();
        },
        error: (error: any) => {
          console.log(error);
        },
      });
  }
  toggleRightContainer(item: any) {
    if (this.activeItemId !== item.id) {
      this.activeItemId = item.id; // Set the clicked item as active
      this.userClicked = true;
      this.collectionName = item.collectionName;
      this.collectionId = item.id;
      this.router.navigate([], {
        relativeTo: this.route,
        queryParams: { collection: true, collectionId: item.id },
        queryParamsHandling: 'merge',
      });
    }
  }
  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
      this.destroy$.next();
      this.destroy$.complete();
      console.log('destroyed');
    }
  }
  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent) {
    // Check if the click was inside any of the example-box or nested-input-container elements
    const clickedInsideExampleBox = this.items.some((item: any) => {
      const boxElement = document.getElementById(`item-${item.id}`);
      return boxElement && boxElement.contains(event.target as Node);
    });

    // Check if the click was inside any of the nested input fields (including nested collections)
    const clickedInsideInput = this.items.some((item: any) => {
      const inputElement = document.getElementById(`nested-input-${item.id}`);
      return inputElement && inputElement.contains(event.target as Node);
    });

    // Recursively check nested items
    const clickedInsideNestedInput = this.items.some((item: any) => {
      return this.checkNestedInputs(item, event.target as Node);
    });

    // Close all nested inputs if click is outside both the example box and nested input
    if (
      !clickedInsideExampleBox &&
      !clickedInsideInput &&
      !clickedInsideNestedInput
    ) {
      this.resetNestedInputs(this.items);
    }
  }

  // Recursive function to check for nested inputs
  checkNestedInputs(item: any, target: Node): boolean {
    const inputElement = document.getElementById(`nested-input-${item.id}`);
    if (inputElement && inputElement.contains(target)) {
      return true;
    }
    // Check child collections recursively
    if (item.childCollections && item.childCollections.length > 0) {
      return item.childCollections.some((child: any) =>
        this.checkNestedInputs(child, target)
      );
    }
    return false;
  }
  onCollectionAdded(newCollection: any): void {
    this.items.push(newCollection);
  }
  onCollectionRemoved(collectionId: string): void {
    this.items = this.items.filter((item: any) => item.id !== collectionId);
    if (this.activeItemId === collectionId) {
      if (this.items.length > 0) {
        // Set the first collection as the new active collection
        const newActiveCollection = this.items[0];
        this.activeItemId = newActiveCollection.id;
        this.collectionName = newActiveCollection.collectionName;
        this.collectionId = newActiveCollection.id;
        this.router.navigate([], {
          relativeTo: this.route,
          queryParams: { collection: true, collectionId: newActiveCollection.id },
          queryParamsHandling: 'merge',
        });
      } else {
        // If there are no collections left, clear the active collection
        this.activeItemId = null;
        this.collectionName = null;
        this.collectionId = '';
        this.router.navigate([], {
          relativeTo: this.route,
          queryParams: { collection: null, collectionId: null },
          queryParamsHandling: 'merge',
        });
      }
    }
  }
  onCollectionEdited(editedCollection: any): void {
    const index = this.items.findIndex(
      (item: any) => item.id === editedCollection.id
    );
    if (index !== -1) {
      this.items[index] = editedCollection;
      this.collectionName = editedCollection.collectionName;
    }
  }
  onLinkEdit(editedLink: any): void {
    const collection = this.items.find(
      (item: any) => item.id === this.collectionId
    );
    if (collection) {
      const linkIndex = collection.links.findIndex(
        (link: any) => link.id === editedLink.id
      );
      if (linkIndex !== -1) {
        collection.links[linkIndex] = editedLink;
      }
    }
  }
  onLinkAdded(newLink: any): void {
    const collection = this.items.find(
      (item: any) => item.id === this.collectionId
    );
    console.log(collection);
    if (collection) {
      collection.links.push(newLink);
    }
  }
  onLinkRemoved(deleteLinkId: any): void {
    console.log(this.collectionId);
    const collection = this.items.find(
      (item: any) => item.id === this.collectionId
    );
    console.log(collection);
    if (collection) {
      collection.links = collection.links.filter(
        (item: any) => item.id !== deleteLinkId
      );
    }
  }
  showPopup() {
    this.popup = true;
    clearTimeout(this.timeoutId);
    this.timeoutId = setTimeout(() => {
      this.popup = false;
    }, 3000);
  }
  hideImage(event:Event){
    const img = event.target as HTMLImageElement;
    img.hidden=true;
  }
}
