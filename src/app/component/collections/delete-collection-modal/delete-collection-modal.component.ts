import { Component, EventEmitter, Output } from '@angular/core';
import { CollectionService } from '../../../service/collection.service';

@Component({
  selector: 'app-delete-collection-modal',
  standalone: false,
  
  templateUrl: './delete-collection-modal.component.html',
  styleUrl: './delete-collection-modal.component.css'
})
export class DeleteCollectionModalComponent {
  constructor(private collectionService:CollectionService){}
  isVisible = false;
  collectionName:string="";
  id:string="";
    @Output() closed = new EventEmitter<void>();
    @Output()collectionRemoved= new EventEmitter<any>();
    closeModal(): void {
      this.isVisible = false;
      this.closed.emit();
    }  
    openModal(item:any): void {
      this.isVisible = true;
     this.collectionName= item.collectionName;
     this.id=item.id;
    }
    deleteCollection(){
      this.collectionService.deleteCollection(this.id).subscribe({
        next:(response)=>{
          console.log(response);
          this.isVisible=false;
          this.collectionRemoved.emit(this.id);
          this.closed.emit();
        }
      })
    }
}
