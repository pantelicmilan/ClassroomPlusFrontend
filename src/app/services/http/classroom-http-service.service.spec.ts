import { TestBed } from '@angular/core/testing';

import { ClassroomHttpService } from './classroom-http-service.service';

describe('ClassroomHttpServiceService', () => {
  let service: ClassroomHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClassroomHttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
