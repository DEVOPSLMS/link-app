import { Component, inject, OnInit } from '@angular/core';
import { CollectionService } from '../../service/collection.service';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
  
  constructor(private collectionService:CollectionService){
    this.addCollectionForm = this.fb.group({
          name: ['', [Validators.required]],
          
        });
  }
  ngOnInit(): void {
    this.collectionService.getCollection().subscribe({
      next:(response)=>{
       
        this.items=response;
        this.items=response.map((item: any)=>({
          ...item,
          inputVisible:false
          
        }));
        console.log(response);
      },
      error:(err)=>{
        console.log("Error fetching collections",err);
      }
    })
    this.loadItems();
  }
  drop(event: CdkDragDrop<string[]>) {
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
  toggleNestedInput(index: number) {
    // Reset all other inputs
    this.items.forEach((item: { showNestedInput: boolean; }) => item.showNestedInput = false);
    // Toggle input for clicked item
    this.items[index].showNestedInput = !this.items[index].showNestedInput;
    this.items[index].newNestedName = ''; // Reset input value
  }
  addNestedCollection(parentItem: any) {
    if (parentItem.newNestedName?.trim()) {
      // Add your logic to create nested collection
      const newNestedCollection = {
        collectionName: parentItem.newNestedName.trim(),
        parentId: parentItem.id,
        showNestedInput: false
      };
      
      // Update your data structure here

    }
  }
}
