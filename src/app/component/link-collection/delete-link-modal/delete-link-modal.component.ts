import { Component, EventEmitter, Output } from '@angular/core';
import { LinkService } from '../../../service/link.service';

@Component({
  selector: 'app-delete-link-modal',
  standalone: false,
  
  templateUrl: './delete-link-modal.component.html',
  styleUrl: './delete-link-modal.component.css'
})
export class DeleteLinkModalComponent {
constructor(private linkService:LinkService){}
  isVisible = false;
  url:string="";
  id:string="";
    @Output() closed = new EventEmitter<void>();
    @Output()linkRemoved= new EventEmitter<any>();
    closeModal(): void {
      this.isVisible = false;
      this.closed.emit();
    }  
    openModal(item:any): void {
      this.isVisible = true;
     this.url= item.url;
     this.id=item.id;
    }
    deleteLink(){
      this.linkService.deleteLink(this.id).subscribe({
        next:(response)=>{
          console.log(response);
          this.isVisible=false;
          this.linkRemoved.emit(this.id);
          this.closed.emit();
        }
      })
    }
}
