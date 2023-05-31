import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameRoomSideBarComponent } from './game-room-side-bar.component';

describe('GameRoomSideBarComponent', () => {
  let component: GameRoomSideBarComponent;
  let fixture: ComponentFixture<GameRoomSideBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GameRoomSideBarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GameRoomSideBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
