import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { CollectionService } from '../../../service/collection.service';
import { FormBuilder } from '@angular/forms';
import { DOCUMENT } from '@angular/common';
@Component({
  selector: 'app-share-collection-modal',
  standalone: false,
  
  templateUrl: './share-collection-modal.component.html',
  styleUrl: './share-collection-modal.component.css'
})
export class ShareCollectionModalComponent {
  isLoading = false;
  constructor(private collectionService:CollectionService,private fb:FormBuilder,@Inject(DOCUMENT) private document: Document){
    
  }
  id:string='';
  isVisible = false;
  activeButton: string = 'button1'; 
  collectionDetails:any;
  privateLink:string='';
  @Output() closed = new EventEmitter<void>();
  @Output()collectionAdded= new EventEmitter<any>();
  closeModal(): void {
    this.isVisible = false;
    this.closed.emit();
  }  
  openModal(activeItemId:any): void {
    this.isVisible = true;
    this.id=activeItemId;
    this.collectionService.getCollectionById(this.id).subscribe({
      next: (response: any) => {
        this.collectionDetails=response;
        const baseUrl=this.document.location.origin;
        const routePath='/share'
        console.log(baseUrl)
        this.privateLink= `${baseUrl}${routePath}?collectionId=${this.collectionDetails.id}?privateKey=${this.collectionDetails.privateKey}`
      }
    })
  }
  toggleActive(button:string): void {
    this.activeButton = button;
  }
}
