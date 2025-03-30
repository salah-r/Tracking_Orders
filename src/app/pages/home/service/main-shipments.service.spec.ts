import { TestBed } from '@angular/core/testing';

import { MainShipmentsService } from './main-shipments.service';

describe('MainShipmentsService', () => {
  let service: MainShipmentsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MainShipmentsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
