import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignInGameRoomComponent } from './sign-in.component';

describe('SignInGameRoomComponent', () => {
  let component: SignInGameRoomComponent;
  let fixture: ComponentFixture<SignInGameRoomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignInGameRoomComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignInGameRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
