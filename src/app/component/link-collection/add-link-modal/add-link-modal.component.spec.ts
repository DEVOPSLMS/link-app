import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddLinkModalComponent } from './add-link-modal.component';

describe('AddLinkModalComponent', () => {
  let component: AddLinkModalComponent;
  let fixture: ComponentFixture<AddLinkModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddLinkModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddLinkModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
