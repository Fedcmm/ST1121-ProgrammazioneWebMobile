import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteEventsComponent } from './delete-events.component';

describe('DeleteEventComponent', () => {
  let component: DeleteEventsComponent;
  let fixture: ComponentFixture<DeleteEventsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteEventsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteEventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
