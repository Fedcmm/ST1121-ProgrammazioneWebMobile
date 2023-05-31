import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifyRecordComponent } from './verify-record.component';

describe('VerifyRecordComponent', () => {
  let component: VerifyRecordComponent;
  let fixture: ComponentFixture<VerifyRecordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerifyRecordComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerifyRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
