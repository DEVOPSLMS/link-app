import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteLinkModalComponent } from './delete-link-modal.component';

describe('DeleteLinkModalComponent', () => {
  let component: DeleteLinkModalComponent;
  let fixture: ComponentFixture<DeleteLinkModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeleteLinkModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteLinkModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
