import { TestBed } from '@angular/core/testing';

import { ApiConnService } from './api-conn.service';

describe('ApiConnService', () => {
  let service: ApiConnService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiConnService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
