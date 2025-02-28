import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShareCollectionComponent } from './share-collection.component';

describe('ShareCollectionComponent', () => {
  let component: ShareCollectionComponent;
  let fixture: ComponentFixture<ShareCollectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ShareCollectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShareCollectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
