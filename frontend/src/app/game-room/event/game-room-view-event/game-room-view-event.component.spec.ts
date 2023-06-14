import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GameRoomViewEventsComponent } from './game-room-view-event.component';

describe('GameRoomViewEventsComponent', () => {
  let component: GameRoomViewEventsComponent;
  let fixture: ComponentFixture<GameRoomViewEventsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GameRoomViewEventsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GameRoomViewEventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
