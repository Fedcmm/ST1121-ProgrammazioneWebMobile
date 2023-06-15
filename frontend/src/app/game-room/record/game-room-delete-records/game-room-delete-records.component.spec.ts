import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameRoomDeleteRecordsComponent } from 'src/app/game-room/record/game-room-delete-records/game-room-delete-records.component';

describe('DeleteRecordsComponent', () => {
  let component: GameRoomDeleteRecordsComponent;
  let fixture: ComponentFixture<GameRoomDeleteRecordsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GameRoomDeleteRecordsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GameRoomDeleteRecordsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
