import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApiDebugComponentComponent } from './api-debug-component.component';

describe('ApiDebugComponentComponent', () => {
  let component: ApiDebugComponentComponent;
  let fixture: ComponentFixture<ApiDebugComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApiDebugComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApiDebugComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
