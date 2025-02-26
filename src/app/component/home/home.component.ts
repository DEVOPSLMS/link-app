import { Component, OnInit } from '@angular/core';
import { CollectionService } from '../../service/collection.service';
import { CollectionResponse } from '../../Models/collection_model';

@Component({
  selector: 'app-home',
  standalone: false,

  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
 items:CollectionResponse[]=[];
  constructor(private collectionService:CollectionService){}
  ngOnInit(): void {
   this.collectionService.getCollection().subscribe((data)=>{
     this.items=data;
     console.log(this.items)
   })
 }
}
