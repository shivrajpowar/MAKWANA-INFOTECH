import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusyloginComponent } from './busylogin.component';

describe('BusyloginComponent', () => {
  let component: BusyloginComponent;
  let fixture: ComponentFixture<BusyloginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BusyloginComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BusyloginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
