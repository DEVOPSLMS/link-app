import { ChangeDetectorRef, Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../service/auth.service';
import { Router } from '@angular/router';
import { CollectionService } from '../../../service/collection.service';

@Component({
  selector: 'app-add-collection-modal',
  standalone: false,
  
  templateUrl: './add-collection-modal.component.html',
  styleUrl: './add-collection-modal.component.css'
})
export class AddCollectionModalComponent {
  addForm: FormGroup;
  isLoading = false;
  constructor(private collectionService:CollectionService,private fb:FormBuilder,private cdr:ChangeDetectorRef,private router:Router){
    this.addForm = this.fb.group({
      name: ['', [Validators.required]]
      
    });
  }
  
  isVisible = false;

  @Output() closed = new EventEmitter<void>();
  @Output()collectionAdded= new EventEmitter<any>();
  closeModal(): void {
    this.isVisible = false;
    this.closed.emit();
  }  
  openModal(): void {
    this.isVisible = true;
    
  }
  addCollection(){  
    this.collectionService.addCollection(this.addForm.value.name).subscribe({
      next:(response)=>{
        this.collectionAdded.emit(response);
        this.isLoading = false;
        this.addForm.reset();
        this.closeModal();
      }
    })
  }
}
