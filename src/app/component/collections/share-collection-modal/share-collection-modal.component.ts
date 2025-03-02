import { Component, EventEmitter, Inject, OnDestroy, Output } from '@angular/core';
import { CollectionService } from '../../../service/collection.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DOCUMENT } from '@angular/common';
import { Subject, takeUntil } from 'rxjs';
@Component({
  selector: 'app-share-collection-modal',
  standalone: false,
  
  templateUrl: './share-collection-modal.component.html',
  styleUrl: './share-collection-modal.component.css'
})
export class ShareCollectionModalComponent implements OnDestroy{
  isLoading = false;
  editForm:FormGroup
  constructor(private collectionService:CollectionService,private fb:FormBuilder,@Inject(DOCUMENT) private document: Document){
    this.editForm = this.fb.group({
          isPublic:[false,[Validators.required]]
        });
  }
  id:string='';
  isVisible = false;
  activeButton: string = 'button1'; 
  collectionDetails:any;
  privateLink:string='';
  publicLink:string='';

  @Output() closed = new EventEmitter<void>();
  @Output()collectionAdded= new EventEmitter<any>();
    private destroy$ = new Subject<void>();
    subscription:any;
  closeModal(): void {
    this.isVisible = false;
    this.closed.emit();
  }  
  openModal(activeItemId:any): void {
    this.isVisible = true;
    this.id=activeItemId;
    this.subscription=this.collectionService.getCollectionById(this.id).pipe(takeUntil(this.destroy$)).subscribe({
      next: (response: any) => {
 
        this.collectionDetails=response;
        console.log(this.collectionDetails)
        const baseUrl=this.document.location.origin;
        this.editForm.patchValue({
          isPublic:this.collectionDetails.isPublic
        })
        
        const routePath='/share';
        this.privateLink= `${baseUrl}${routePath}?collectionId=${this.collectionDetails.id}&privateKey=${this.collectionDetails.privateKey}`;
        console.log(this.editForm.value.isPublic);
        this.publicLink=`${baseUrl}${routePath}?collectionId=${this.collectionDetails.id}`;
      }
      
    })
  }
  toggleActive(button:string): void {
    this.activeButton = button;
  }
  updateCollectionPublic(){
    this.collectionService.editCollectionPublic(this.editForm.value.isPublic,this.collectionDetails.id).subscribe({
      next:(response:any)=>{
        this.collectionDetails.isPublic=this.editForm.value.isPublic;
      }
    })
  }
  ngOnDestroy(): void {
    if(this.subscription){
      this.subscription.unsubscribe();
      this.destroy$.next();
      this.destroy$.complete();
      
    }
  }
  generateNewLink(){
    this.isLoading=true;
    
    this.collectionService.updateCollectionPrivate(this.id).subscribe({
      next:(response:any)=>{
        setTimeout(()=>{
          this.isLoading=false;
          const baseUrl=this.document.location.origin;
          const routePath='/share';
          this.privateLink= `${baseUrl}${routePath}?collectionId=${this.collectionDetails.id}&privateKey=${response.privateKey}`;
        },2000);
        
      }
    })
  }
}
