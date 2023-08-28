import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SymptomMonitoringComponent } from './symptom-monitoring.component';

describe('SymptomMonitoringComponent', () => {
  let component: SymptomMonitoringComponent;
  let fixture: ComponentFixture<SymptomMonitoringComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SymptomMonitoringComponent]
    });
    fixture = TestBed.createComponent(SymptomMonitoringComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
