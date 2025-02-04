import { Component, OnInit } from '@angular/core';
import { CollectionService } from '../../service/collection.service';

@Component({
  selector: 'app-collection',
  standalone: false,
  
  templateUrl: './collection.component.html',
  styleUrl: './collection.component.css'
})
export class CollectionComponent implements OnInit{
  constructor(private collectionService:CollectionService){}
  ngOnInit(): void {
    this.collectionService.getCollection().subscribe({
      next:(response)=>{
        console.log(response);
      }
    })
  }
}
