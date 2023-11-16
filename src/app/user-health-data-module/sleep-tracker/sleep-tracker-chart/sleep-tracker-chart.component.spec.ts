import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SleepTrackerChartComponent } from './sleep-tracker-chart.component';

describe('SleepTrackerChartComponent', () => {
  let component: SleepTrackerChartComponent;
  let fixture: ComponentFixture<SleepTrackerChartComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SleepTrackerChartComponent]
    });
    fixture = TestBed.createComponent(SleepTrackerChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
