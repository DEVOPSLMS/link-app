import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CollectionService } from '../../../service/collection.service';
import { LinkService } from '../../../service/link.service';

@Component({
  selector: 'app-add-link-modal',
  standalone: false,
  
  templateUrl: './add-link-modal.component.html',
  styleUrl: './add-link-modal.component.css'
})
export class AddLinkModalComponent {
  @ViewChild('urlInput') urlInput!: ElementRef;
addForm: FormGroup;
  isLoading = false;
  collectionId:string="";
  tags: string[] = [];
  constructor(private linkService:LinkService,private fb:FormBuilder){
    this.addForm = this.fb.group({
      url: ['', [Validators.required]],
      tags: [''],
      description:['']
    });
  }


  isVisible = false;

  @Output() closed = new EventEmitter<void>();
  @Output()linkAdded= new EventEmitter<any>();
  closeModal(): void {
    this.isVisible = false;
    this.closed.emit();
  }  
  openModal(collectionId:string): void {
    this.isVisible = true;
    this.collectionId=collectionId;
    setTimeout(() => {
      this.urlInput.nativeElement.focus();
    }, 0);
  }

  addTag(tag: string): void {
    if (!this.tags.includes(tag)) {
      this.tags.push(tag);
      this.updateTagsInput();
    }
  }

  removeTag(index: number): void {
    this.tags.splice(index, 1);
    this.updateTagsInput();
  }
  handleTagInput(event: KeyboardEvent): void {
    const input = event.target as HTMLInputElement;
    const value = input.value.trim();

    if (event.key === 'Enter' && value) {
      this.addTag(value);
      input.value = '';
      event.preventDefault();
    }
  }
  updateTagsInput(): void {
    this.addForm.patchValue({ tags: this.tags.join(',') });
  }
  addLink(){
    this.linkService.addLink(this.addForm.value.url,this.collectionId,this.addForm.value.tags,this.addForm.value.description).subscribe({
      next:(response)=>{
        this.linkAdded.emit(response);
        this.isLoading = false;
        this.addForm.reset();
        this.closeModal();
      }   
  })
}
}

