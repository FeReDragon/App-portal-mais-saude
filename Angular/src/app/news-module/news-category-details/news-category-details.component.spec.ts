import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsCategoryDetailsComponent } from './news-category-details.component';

describe('NewsCategoryDetailsComponent', () => {
  let component: NewsCategoryDetailsComponent;
  let fixture: ComponentFixture<NewsCategoryDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewsCategoryDetailsComponent]
    });
    fixture = TestBed.createComponent(NewsCategoryDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
