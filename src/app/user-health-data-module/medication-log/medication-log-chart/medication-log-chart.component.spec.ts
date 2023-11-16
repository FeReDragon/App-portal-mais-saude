import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicationLogChartComponent } from './medication-log-chart.component';

describe('MedicationLogChartComponent', () => {
  let component: MedicationLogChartComponent;
  let fixture: ComponentFixture<MedicationLogChartComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MedicationLogChartComponent]
    });
    fixture = TestBed.createComponent(MedicationLogChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
