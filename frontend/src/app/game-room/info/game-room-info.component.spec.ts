import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameRoomInfoComponent } from './game-room-info.component';

describe('GameRoomInfoComponent', () => {
  let component: GameRoomInfoComponent;
  let fixture: ComponentFixture<GameRoomInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GameRoomInfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GameRoomInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
