import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameRoomDeleteRecordComponent } from './game-room-delete-record.component';

describe('DeleteRecordComponent', () => {
  let component: GameRoomDeleteRecordComponent;
  let fixture: ComponentFixture<GameRoomDeleteRecordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GameRoomDeleteRecordComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GameRoomDeleteRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
