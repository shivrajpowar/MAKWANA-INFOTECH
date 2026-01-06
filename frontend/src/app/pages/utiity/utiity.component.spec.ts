import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UtiityComponent } from './utiity.component';

describe('UtiityComponent', () => {
  let component: UtiityComponent;
  let fixture: ComponentFixture<UtiityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UtiityComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UtiityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
