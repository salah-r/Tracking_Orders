import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateUpdateShipmentComponent } from './create-update-shipment.component';

describe('CreateUpdateShipmentComponent', () => {
  let component: CreateUpdateShipmentComponent;
  let fixture: ComponentFixture<CreateUpdateShipmentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateUpdateShipmentComponent]
    });
    fixture = TestBed.createComponent(CreateUpdateShipmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
