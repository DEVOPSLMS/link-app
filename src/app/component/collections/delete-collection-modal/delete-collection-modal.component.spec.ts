import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteCollectionModalComponent } from './delete-collection-modal.component';

describe('DeleteCollectionModalComponent', () => {
  let component: DeleteCollectionModalComponent;
  let fixture: ComponentFixture<DeleteCollectionModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeleteCollectionModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteCollectionModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
