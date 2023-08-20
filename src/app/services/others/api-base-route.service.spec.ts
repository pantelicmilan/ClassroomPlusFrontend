import { TestBed } from '@angular/core/testing';

import { ApiBaseRouteService } from './api-base-route.service';

describe('ApiBaseRouteService', () => {
  let service: ApiBaseRouteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiBaseRouteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
