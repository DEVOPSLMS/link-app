import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCollectionModalComponent } from './view-collection-modal.component';

describe('ViewCollectionModalComponent', () => {
  let component: ViewCollectionModalComponent;
  let fixture: ComponentFixture<ViewCollectionModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewCollectionModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewCollectionModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
