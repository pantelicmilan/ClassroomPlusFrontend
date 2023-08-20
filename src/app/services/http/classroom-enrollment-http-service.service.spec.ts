import { TestBed } from '@angular/core/testing';

import { ClassroomEnrollmentHttpService } from './classroom-enrollment-http-service.service';

describe('ClassroomEnrollmentHttpServiceService', () => {
  let service: ClassroomEnrollmentHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClassroomEnrollmentHttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
