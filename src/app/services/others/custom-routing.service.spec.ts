import { TestBed } from '@angular/core/testing';

import { CustomRoutingService } from './services/others/custom-routing.service';

describe('CustomRoutingService', () => {
  let service: CustomRoutingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomRoutingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
