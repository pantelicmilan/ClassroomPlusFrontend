import { TestBed } from '@angular/core/testing';

import { CriticalErrorSnapshotService } from './services/others/critical-error-snapshot.service';

describe('CriticalErrorSnapshotService', () => {
  let service: CriticalErrorSnapshotService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CriticalErrorSnapshotService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
