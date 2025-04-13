import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAllShipmentsComponent } from './view-all-shipments.component';

describe('ViewAllShipmentsComponent', () => {
  let component: ViewAllShipmentsComponent;
  let fixture: ComponentFixture<ViewAllShipmentsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewAllShipmentsComponent]
    });
    fixture = TestBed.createComponent(ViewAllShipmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
