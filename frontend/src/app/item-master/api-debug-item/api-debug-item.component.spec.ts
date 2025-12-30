import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApiDebugItemComponent } from './api-debug-item.component';

describe('ApiDebugItemComponent', () => {
  let component: ApiDebugItemComponent;
  let fixture: ComponentFixture<ApiDebugItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApiDebugItemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApiDebugItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
