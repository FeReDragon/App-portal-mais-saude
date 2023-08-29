import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HealthDataSummaryComponent } from './health-data-summary.component';

describe('HealthDataSummaryComponent', () => {
  let component: HealthDataSummaryComponent;
  let fixture: ComponentFixture<HealthDataSummaryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HealthDataSummaryComponent]
    });
    fixture = TestBed.createComponent(HealthDataSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
