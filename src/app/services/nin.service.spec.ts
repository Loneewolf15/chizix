import { TestBed } from '@angular/core/testing';

import { NinService } from './nin.service';

describe('NinService', () => {
  let service: NinService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NinService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
