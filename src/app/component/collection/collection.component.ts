import { Component, inject, OnInit } from '@angular/core';
import { CollectionService } from '../../service/collection.service';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ArrayDataSource } from '@angular/cdk/collections';
import { NestedTreeControl } from '@angular/cdk/tree';

@Component({
  selector: 'app-collection',
  standalone: false,

  templateUrl: './collection.component.html',
  styleUrl: './collection.component.css'
})
export class CollectionComponent implements OnInit{
  router=inject(Router);
  fb=inject(FormBuilder);
  addCollectionForm:FormGroup
  items:any;
  isVisible =false;
  isSubCollection:any;
 
  constructor(private collectionService:CollectionService){
    this.addCollectionForm = this.fb.group({
          name: ['', [Validators.required]],
          
        });
  }
  ngOnInit(): void {
    this.collectionService.getCollection().subscribe({
      next:(response)=>{
       
        this.items=response;
     
        console.log(response);
  
        
      },
      error:(err)=>{
        console.log("Error fetching collections",err);
      }
    })
    this.loadItems();
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
  toggleNestedInput(targetItem: any) {
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
  addNestedCollection(parentItem: any) {

  
    this.collectionService.addCollection(this.addCollectionForm.get('name')?.value,parentItem.id).subscribe({
      next:(response:any)=>{
        const newCollection = response;

        // Initialize properties if necessary
        newCollection.childCollections = [];
        newCollection.showChildren = false;
        newCollection.showNestedInput = false;

        // Add the new collection to the parent item's childCollections array
        if (!parentItem.childCollections) {
            parentItem.childCollections = [];
        }
        parentItem.childCollections.push(newCollection);
        parentItem.showNestedInput=false;
        // Optionally, clear the form input
        this.addCollectionForm.reset();
      },
      error:(error:any)=>{
        console.log(error);
      }
    })
  }
  consoleLog(item:string){
    
  }
}
