import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { CollectionService } from '../../../service/collection.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-view-collection-modal',
  standalone: false,
  
  templateUrl: './view-collection-modal.component.html',
  styleUrl: './view-collection-modal.component.css'
})
export class ViewCollectionModalComponent {
    id:string="";
    collectionName:string="";
    createdDate: string = "";
    isVisible = false;
    length:number=0;
    constructor(private collectionService:CollectionService,private datePipe: DatePipe){
      
    }
    
  
    @Output() closed = new EventEmitter<void>();
    @Output()collectionEdited= new EventEmitter<any>();
    closeModal(): void {
      this.isVisible = false;
      this.closed.emit();
    }  
  openModal(item:any): void {
    this.isVisible = true;
    this.collectionName=item.collectionName;
    this.id=item.id;
    this.length=item.links.length
    this.createdDate = this.datePipe.transform(item.created, 'medium',Intl.DateTimeFormat().resolvedOptions().timeZone); // Format the date
  }
}
