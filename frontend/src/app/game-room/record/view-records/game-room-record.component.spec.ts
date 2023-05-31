import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameRoomRecordComponent } from './game-room-record.component';

describe('GameRoomRecordComponent', () => {
  let component: GameRoomRecordComponent;
  let fixture: ComponentFixture<GameRoomRecordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GameRoomRecordComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GameRoomRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
