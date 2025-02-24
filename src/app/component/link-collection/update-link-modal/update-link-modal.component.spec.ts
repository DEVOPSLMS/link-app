import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateLinkModalComponent } from './update-link-modal.component';

describe('UpdateLinkModalComponent', () => {
  let component: UpdateLinkModalComponent;
  let fixture: ComponentFixture<UpdateLinkModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UpdateLinkModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateLinkModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
