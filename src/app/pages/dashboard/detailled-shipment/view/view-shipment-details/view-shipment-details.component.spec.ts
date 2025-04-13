import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewShipmentDetailsComponent } from './view-shipment-details.component';

describe('ViewShipmentDetailsComponent', () => {
  let component: ViewShipmentDetailsComponent;
  let fixture: ComponentFixture<ViewShipmentDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewShipmentDetailsComponent]
    });
    fixture = TestBed.createComponent(ViewShipmentDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
