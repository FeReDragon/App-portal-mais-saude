import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicationLogComponent } from './medication-log.component';

describe('MedicationLogComponent', () => {
  let component: MedicationLogComponent;
  let fixture: ComponentFixture<MedicationLogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MedicationLogComponent]
    });
    fixture = TestBed.createComponent(MedicationLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
