import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProducteComponent } from './producte.component';

describe('ProducteComponent', () => {
  let component: ProducteComponent;
  let fixture: ComponentFixture<ProducteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProducteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProducteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
