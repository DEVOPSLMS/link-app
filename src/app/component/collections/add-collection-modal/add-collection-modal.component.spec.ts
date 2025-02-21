import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCollectionModalComponent } from './add-collection-modal.component';

describe('AddCollectionModalComponent', () => {
  let component: AddCollectionModalComponent;
  let fixture: ComponentFixture<AddCollectionModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddCollectionModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddCollectionModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
