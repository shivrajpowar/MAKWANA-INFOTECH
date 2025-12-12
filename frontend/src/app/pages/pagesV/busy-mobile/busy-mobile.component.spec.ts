import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusyMobileComponent } from './busy-mobile.component';

describe('BusyMobileComponent', () => {
  let component: BusyMobileComponent;
  let fixture: ComponentFixture<BusyMobileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BusyMobileComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BusyMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
