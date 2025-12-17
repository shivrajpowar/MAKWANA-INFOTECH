import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesModifyComponent } from './sales-modify.component';

describe('SalesModifyComponent', () => {
  let component: SalesModifyComponent;
  let fixture: ComponentFixture<SalesModifyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SalesModifyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SalesModifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
