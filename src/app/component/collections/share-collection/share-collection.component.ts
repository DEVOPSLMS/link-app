import { Component, OnInit } from '@angular/core';
import { CollectionService } from '../../../service/collection.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-share-collection',
  standalone: false,
  
  templateUrl: './share-collection.component.html',
  styleUrl: './share-collection.component.css'
})
export class ShareCollectionComponent implements OnInit{
  
  constructor(private collectionService:CollectionService,private route:ActivatedRoute){}
  ngOnInit(): void {
    
  }
}
