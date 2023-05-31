import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameRoomEventsComponent } from './game-room-events.component';

describe('GameRoomEventsComponent', () => {
  let component: GameRoomEventsComponent;
  let fixture: ComponentFixture<GameRoomEventsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GameRoomEventsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GameRoomEventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
