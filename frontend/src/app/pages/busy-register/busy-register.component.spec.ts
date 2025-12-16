import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusyRegisterComponent } from './busy-register.component';

describe('BusyRegisterComponent', () => {
  let component: BusyRegisterComponent;
  let fixture: ComponentFixture<BusyRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BusyRegisterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BusyRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
