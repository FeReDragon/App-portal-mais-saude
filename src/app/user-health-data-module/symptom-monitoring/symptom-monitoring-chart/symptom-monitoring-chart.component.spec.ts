import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SymptomMonitoringChartComponent } from './symptom-monitoring-chart.component';

describe('SymptomMonitoringChartComponent', () => {
  let component: SymptomMonitoringChartComponent;
  let fixture: ComponentFixture<SymptomMonitoringChartComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SymptomMonitoringChartComponent]
    });
    fixture = TestBed.createComponent(SymptomMonitoringChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
