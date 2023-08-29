import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintableReportsComponent } from './printable-reports.component';

describe('PrintableReportsComponent', () => {
  let component: PrintableReportsComponent;
  let fixture: ComponentFixture<PrintableReportsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PrintableReportsComponent]
    });
    fixture = TestBed.createComponent(PrintableReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
