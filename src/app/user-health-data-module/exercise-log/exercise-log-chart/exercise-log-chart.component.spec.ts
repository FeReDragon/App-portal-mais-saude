import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExerciseLogChartComponent } from './exercise-log-chart.component';

describe('ExerciseLogChartComponent', () => {
  let component: ExerciseLogChartComponent;
  let fixture: ComponentFixture<ExerciseLogChartComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExerciseLogChartComponent]
    });
    fixture = TestBed.createComponent(ExerciseLogChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
