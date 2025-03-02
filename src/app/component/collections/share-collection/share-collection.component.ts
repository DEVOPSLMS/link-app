import { Component, OnDestroy, OnInit } from '@angular/core';
import { CollectionService } from '../../../service/collection.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, Subscription, takeUntil } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-share-collection',
  standalone: false,
  
  templateUrl: './share-collection.component.html',
  styleUrl: './share-collection.component.css'
})
export class ShareCollectionComponent implements OnInit,OnDestroy{
  collectionId:string |null = null;
  privateKey:string | null = null;
  collectionDetails:any |null =null;
    private subscription: Subscription;
    private destroy$ = new Subject<void>();
    userClicked:boolean =false;
    linkId:string="";
    currentLink:any;
  constructor(private collectionService:CollectionService,private route:ActivatedRoute,private router:Router){}
  ngOnInit(): void {
    this.route.queryParams.subscribe(params=>{
      this.collectionId=params['collectionId']|| null;
      this.privateKey=params['privateKey']|| null;
      console.log(this.privateKey)
      console.log(this.collectionId)
      if(this.privateKey == null){
       this.subscription= this.collectionService.getCollectionById(this.collectionId).pipe(takeUntil(this.destroy$)).subscribe({
          next:(response:any)=>{
            if(response.isPublic === false){
              this.handleForbidden();
            }
            else{
              this.collectionDetails=response;
              console.log(this.collectionDetails)
            }
           
          },
          error:(error:HttpErrorResponse)=>{
            this.handleForbidden();
          }
        })
      }
      else{
        this.subscription=this.collectionService.getCollectionPrivate(this.privateKey).pipe(takeUntil(this.destroy$)).subscribe({
          next:(response:any)=>{
            this.collectionDetails=response;
            console.log(this.collectionDetails)
          }
        })
      }
    })
  }
  handleForbidden(): void {
    console.error('Access forbidden: Collection is not public');
    this.router.navigate(['/app'], { replaceUrl: true });
  }
  hideImage(event: Event) {
    const img = event.target as HTMLImageElement;
    img.hidden = true;
  }
  ngOnDestroy(): void {
    if(this.subscription){
      this.subscription.unsubscribe();
      this.destroy$.next();
      this.destroy$.complete();
    }
  }
  click(linkId:string){
    this.userClicked=true;
    this.linkId=linkId;
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { linkId: this.linkId },
      queryParamsHandling: 'merge',
    });
    this.currentLink=this.collectionDetails.links.find((link:any)=>link.id==linkId)
  }
}
