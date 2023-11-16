import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FoodDiaryChartComponent } from './food-diary-chart.component';

describe('FoodDiaryChartComponent', () => {
  let component: FoodDiaryChartComponent;
  let fixture: ComponentFixture<FoodDiaryChartComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FoodDiaryChartComponent]
    });
    fixture = TestBed.createComponent(FoodDiaryChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
