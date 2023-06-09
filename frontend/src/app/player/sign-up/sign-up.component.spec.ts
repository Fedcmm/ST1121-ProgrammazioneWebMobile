import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignUpPlayerComponent } from './sign-up.component';

describe('SignUpPlayerComponent', () => {
  let component: SignUpPlayerComponent;
  let fixture: ComponentFixture<SignUpPlayerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignUpPlayerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignUpPlayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
