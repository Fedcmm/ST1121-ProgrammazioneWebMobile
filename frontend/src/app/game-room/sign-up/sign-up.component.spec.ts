import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignUpGameRoomComponent } from './sign-up.component';

describe('SignUpGameRoomComponent', () => {
  let component: SignUpGameRoomComponent;
  let fixture: ComponentFixture<SignUpGameRoomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignUpGameRoomComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignUpGameRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
