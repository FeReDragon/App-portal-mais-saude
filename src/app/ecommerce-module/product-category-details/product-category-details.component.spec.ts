import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductCategoryDetailsComponent } from './product-category-details.component';

describe('ProductCategoryDetailsComponent', () => {
  let component: ProductCategoryDetailsComponent;
  let fixture: ComponentFixture<ProductCategoryDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductCategoryDetailsComponent]
    });
    fixture = TestBed.createComponent(ProductCategoryDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
