import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusypageComponent } from './busypage.component';

describe('BusypageComponent', () => {
  let component: BusypageComponent;
  let fixture: ComponentFixture<BusypageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BusypageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BusypageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
