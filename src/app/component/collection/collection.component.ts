import { Component, ElementRef, HostListener, inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { CollectionService } from '../../service/collection.service';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ArrayDataSource } from '@angular/cdk/collections';
import { NestedTreeControl } from '@angular/cdk/tree';
import { Subject, Subscription, takeUntil } from 'rxjs';
takeUntil
@Component({
  selector: 'app-collection',
  standalone: false,

  templateUrl: './collection.component.html',
  styleUrl: './collection.component.css'
})
export class CollectionComponent implements OnInit,OnDestroy{
  @ViewChild('exampleBox') exampleBox!: ElementRef;
  router=inject(Router);
  fb=inject(FormBuilder);
  addCollectionForm:FormGroup
  items:any;
  isVisible =false;
  isSubCollection:any;
  activeItemId: number | null = null;
  userClicked:any;
  collectionName:any;
  private subscription:Subscription;
  private destroy$ = new Subject<void>();
  constructor(private collectionService:CollectionService){
    this.addCollectionForm = this.fb.group({
          name: ['', [Validators.required]],
          
        });
  }
  // This method gets the collection of the user based on Id
  ngOnInit(): void {
   this.subscription= this.collectionService.getCollection().pipe(takeUntil(this.destroy$))
    .subscribe({
      next:(response)=>{
        this.items=response;
        console.log("collections",this.items);
      },
      error:(err)=>{
        console.log("Error fetching collections",err);
      }
    })
    this.loadItems();
  }
  trackByFn(index: number, item: any): number {
    return item.id; // or any unique identifier
  }
  drop(event: CdkDragDrop<string[]>) {
    const data= this.items.data;
    moveItemInArray(this.items, event.previousIndex, event.currentIndex);
    this.saveItems();
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
  toggleNestedInput(event: MouseEvent,targetItem: any) {
    event.stopPropagation(); 
    this.resetNestedInputs(this.items);
    targetItem.showNestedInput = !targetItem.showNestedInput;
    targetItem.newNestedName = ''; // Reset input value

  }
  resetNestedInputs(items: any[]): void {
    items.forEach(item => {
      item.showNestedInput = false;
      if (item.childCollections?.length) {
        this.resetNestedInputs(item.childCollections);
      }
    });
  }
  addNestedCollection(item:any) {
    this.collectionService.addCollection(this.addCollectionForm.get('name')?.value).subscribe({
      next:(response:any)=>{
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
      error:(error:any)=>{
        console.log(error);
      }
    })
  }
  toggleRightContainer(item:any){
    if (this.activeItemId !== item.id) {
      this.activeItemId = item.id; // Set the clicked item as active
      this.userClicked=true;
      this.collectionName=item.collectionName;
    }
  }
  ngOnDestroy() {
    if(this.subscription)
    {
      this.subscription.unsubscribe();
      this.destroy$.next();
    this.destroy$.complete();
    console.log("destroyed")
    }
  }
  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent) {
    // Check if the click was inside any of the example-box or nested-input-container elements
    const clickedInsideExampleBox = this.items.some((item:any) => {
      const boxElement = document.getElementById(`item-${item.id}`);
      return boxElement && boxElement.contains(event.target as Node);
    });

    // Check if the click was inside any of the nested input fields (including nested collections)
    const clickedInsideInput = this.items.some((item:any) => {
      const inputElement = document.getElementById(`nested-input-${item.id}`);
      return inputElement && inputElement.contains(event.target as Node);
    });

    // Recursively check nested items
    const clickedInsideNestedInput = this.items.some((item:any) => {
      return this.checkNestedInputs(item, event.target as Node);
    });

    // Close all nested inputs if click is outside both the example box and nested input
    if (!clickedInsideExampleBox && !clickedInsideInput && !clickedInsideNestedInput) {
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
      return item.childCollections.some((child: any) => this.checkNestedInputs(child, target));
    }
    return false;
  }
}
