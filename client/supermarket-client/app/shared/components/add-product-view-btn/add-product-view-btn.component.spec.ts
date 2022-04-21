import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProductViewBtnComponent } from './add-product-view-btn.component';

describe('AddProductViewBtnComponent', () => {
  let component: AddProductViewBtnComponent;
  let fixture: ComponentFixture<AddProductViewBtnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddProductViewBtnComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddProductViewBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
