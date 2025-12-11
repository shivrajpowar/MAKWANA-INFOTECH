import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewProducteComponent } from './view-producte.component';

describe('ViewProducteComponent', () => {
  let component: ViewProducteComponent;
  let fixture: ComponentFixture<ViewProducteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewProducteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewProducteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
