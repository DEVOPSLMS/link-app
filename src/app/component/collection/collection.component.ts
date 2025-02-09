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
  test = new ArrayDataSource<any>([]); 
  treeControl= new NestedTreeControl((node:any)=>node.childCollections);
  hasChild = (_: number, node: any) => !!node.childCollections && node.childCollections.length > 0;
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
        this.test=response;
        console.log(this.test);
        
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
