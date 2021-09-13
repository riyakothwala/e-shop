import { TestBed } from '@angular/core/testing';

import { TotalCostService } from './total-cost.service';

describe('TotalCostService', () => {
  let service: TotalCostService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TotalCostService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
