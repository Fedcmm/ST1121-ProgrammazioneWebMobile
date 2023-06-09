import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameRoomProfileComponent } from './game-room-profile.component';

describe('GameRoomProfileComponent', () => {
  let component: GameRoomProfileComponent;
  let fixture: ComponentFixture<GameRoomProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GameRoomProfileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GameRoomProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
