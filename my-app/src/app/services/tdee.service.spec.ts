import { TestBed } from '@angular/core/testing';

import { TdeeService } from './tdee.service';

describe('TdeeService', () => {
  let service: TdeeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TdeeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
