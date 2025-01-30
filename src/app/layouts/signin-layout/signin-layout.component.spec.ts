import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SigninLayoutComponent } from './signin-layout.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('SigninLayoutComponent', () => {
  let component: SigninLayoutComponent;
  let fixture: ComponentFixture<SigninLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SigninLayoutComponent],
      imports: [RouterTestingModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SigninLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    const fixture = TestBed.createComponent(SigninLayoutComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});
