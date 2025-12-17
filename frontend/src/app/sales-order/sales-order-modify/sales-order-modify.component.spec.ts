import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesOrderModifyComponent } from './sales-order-modify.component';

describe('SalesOrderModifyComponent', () => {
  let component: SalesOrderModifyComponent;
  let fixture: ComponentFixture<SalesOrderModifyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SalesOrderModifyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SalesOrderModifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
