import { ChangeDetectorRef, Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CollectionService } from '../../../service/collection.service';

@Component({
  selector: 'app-edit-collection-modal',
  standalone: false,
  
  templateUrl: './edit-collection-modal.component.html',
  styleUrl: './edit-collection-modal.component.css'
})
export class EditCollectionModalComponent {
   @ViewChild('nameInput') collectionNameInput!: ElementRef;
 editForm: FormGroup;
  id:string="";
  collectionName:string="";
  isVisible = false;
  constructor(private collectionService:CollectionService,private fb:FormBuilder){
    this.editForm = this.fb.group({
      name: ['', [Validators.required]],
      isPublic:[false,[Validators.required]]
    });
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
    this.editForm.patchValue({
      name:this.collectionName  
    })
    setTimeout(() => {
      this.collectionNameInput.nativeElement.focus();
    }, 0);
  }
  editCollection(){  
    console.log(this.id)
    this.collectionService.editCollection(this.editForm.value.name,this.id).subscribe({
      next:(response)=>{
        this.collectionEdited.emit(response);
        this.editForm.reset();
        this.closeModal();
      },
      error:(err)=>{
        this.isVisible=false;
      }
    })
  }
}
