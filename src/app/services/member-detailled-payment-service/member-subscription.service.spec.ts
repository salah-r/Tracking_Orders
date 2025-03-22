import { TestBed } from '@angular/core/testing';

import { MemberSubscriptionService } from './member-subscription.service';

describe('MemberSubscriptionService', () => {
  let service: MemberSubscriptionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MemberSubscriptionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
