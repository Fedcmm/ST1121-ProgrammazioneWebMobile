import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameRoomGamesComponent } from './game-room-games.component';

describe('GameRoomGamesComponent', () => {
  let component: GameRoomGamesComponent;
  let fixture: ComponentFixture<GameRoomGamesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GameRoomGamesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GameRoomGamesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
