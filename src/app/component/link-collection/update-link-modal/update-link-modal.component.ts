import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LinkService } from '../../../service/link.service';

@Component({
  selector: 'app-update-link-modal',
  standalone: false,
  templateUrl: './update-link-modal.component.html',
  styleUrl: './update-link-modal.component.css'
})
export class UpdateLinkModalComponent {
  @ViewChild('urlInput') urlInput!: ElementRef;
  editForm: FormGroup;
  id: string = "";
  url: string = "";
  isVisible = false;
  tags: string[] = [];
  description:string="";
  constructor(private linkService: LinkService, private fb: FormBuilder) {
    this.editForm = this.fb.group({
      url: ['', [Validators.required]],
      tagInput: [''],
      description:['']
    });
  }

  @Output() closed = new EventEmitter<void>();
  @Output() urlEdited = new EventEmitter<any>();

  closeModal(): void {
    this.isVisible = false;
    this.closed.emit();
  }

  addTag(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      event.preventDefault();
      const tagInput = this.editForm.get('tagInput');
      if (tagInput && tagInput.value.trim() !== '') {
        this.tags.push(tagInput.value.trim());
        tagInput.setValue('');
      }
    }
  }

  removeTag(index: number): void {
    this.tags.splice(index, 1);
  }

  openModal(item: any): void {
    this.isVisible = true;
    this.url = item.url;
    this.id = item.id;
    this.tags = item.tags ? item.tags.split(',') : [];
    this.description=item.description;
    this.editForm.patchValue({
      url: this.url,
      tagInput: '',
      description:this.description
    });
    setTimeout(() => {
      this.urlInput.nativeElement.focus();
    }, 0);
  }

  editLink(): void {
    console.log(this.editForm.value.description)
    const tags = this.tags.join(',');
    this.linkService.editLink(this.editForm.value.url, tags,this.editForm.value.description,this.id).subscribe({
      next: (response) => {
        this.urlEdited.emit(response);
        console.log(response)
        this.editForm.reset();
        this.closeModal();
      },
      error: (err) => {
        this.isVisible = false;
      }
    });
  }
}