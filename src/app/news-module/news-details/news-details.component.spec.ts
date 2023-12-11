import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsDetailComponent } from './news-details.component';

describe('NewsDetailsComponent', () => {
  let component: NewsDetailComponent;
  let fixture: ComponentFixture<NewsDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewsDetailComponent]
    });
    fixture = TestBed.createComponent(NewsDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
