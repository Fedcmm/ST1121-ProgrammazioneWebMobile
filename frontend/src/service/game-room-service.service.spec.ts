import { TestBed } from '@angular/core/testing';

import { GameRoomServiceService } from './game-room-service.service';

describe('GameRoomServiceService', () => {
  let service: GameRoomServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GameRoomServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
