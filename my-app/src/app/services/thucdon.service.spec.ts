import { TestBed } from '@angular/core/testing';

import { ThucdonService } from './thucdon.service';

describe('ThucdonService', () => {
  let service: ThucdonService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ThucdonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
