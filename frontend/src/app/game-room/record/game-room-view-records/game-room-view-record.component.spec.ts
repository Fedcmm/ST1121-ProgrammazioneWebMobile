import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameRoomViewRecordComponent } from './game-room-view-record.component';

describe('GameRoomViewRecordComponent', () => {
  let component: GameRoomViewRecordComponent;
  let fixture: ComponentFixture<GameRoomViewRecordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GameRoomViewRecordComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GameRoomViewRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
