import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchedulesAddeditComponent } from './schedules-addedit.component';

describe('SchedulesAddeditComponent', () => {
  let component: SchedulesAddeditComponent;
  let fixture: ComponentFixture<SchedulesAddeditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SchedulesAddeditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SchedulesAddeditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
