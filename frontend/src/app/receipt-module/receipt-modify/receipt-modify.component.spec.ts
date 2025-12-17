import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceiptModifyComponent } from './receipt-modify.component';

describe('ReceiptModifyComponent', () => {
  let component: ReceiptModifyComponent;
  let fixture: ComponentFixture<ReceiptModifyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReceiptModifyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReceiptModifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
