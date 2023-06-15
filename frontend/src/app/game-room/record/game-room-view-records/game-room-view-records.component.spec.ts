import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameRoomViewRecordsComponent } from 'src/app/game-room/record/game-room-view-records/game-room-view-records.component';

describe('GameRoomViewRecordsComponent', () => {
  let component: GameRoomViewRecordsComponent;
  let fixture: ComponentFixture<GameRoomViewRecordsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GameRoomViewRecordsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GameRoomViewRecordsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
