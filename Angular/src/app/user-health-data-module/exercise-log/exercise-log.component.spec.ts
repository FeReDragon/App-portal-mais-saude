import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExerciseLogComponent } from './exercise-log.component';

describe('ExerciseLogComponent', () => {
  let component: ExerciseLogComponent;
  let fixture: ComponentFixture<ExerciseLogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExerciseLogComponent]
    });
    fixture = TestBed.createComponent(ExerciseLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
