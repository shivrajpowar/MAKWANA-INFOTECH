import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemModifyComponent } from './item-modify.component';

describe('ItemModifyComponent', () => {
  let component: ItemModifyComponent;
  let fixture: ComponentFixture<ItemModifyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ItemModifyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ItemModifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
