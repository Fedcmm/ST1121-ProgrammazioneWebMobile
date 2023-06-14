import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerViewRecordsComponent } from './player-view-records.component';

describe('PlayerViewRecordsComponent', () => {
  let component: PlayerViewRecordsComponent;
  let fixture: ComponentFixture<PlayerViewRecordsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlayerViewRecordsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlayerViewRecordsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
