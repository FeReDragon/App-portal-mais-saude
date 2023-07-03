import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivateComponentComponent } from './private-component.component';

describe('PrivateComponentComponent', () => {
  let component: PrivateComponentComponent;
  let fixture: ComponentFixture<PrivateComponentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PrivateComponentComponent]
    });
    fixture = TestBed.createComponent(PrivateComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
