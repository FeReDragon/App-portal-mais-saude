import { TestBed } from '@angular/core/testing';

import { UserHealthDataService } from './user-health-data.service';

describe('UserHealthDataService', () => {
  let service: UserHealthDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserHealthDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
