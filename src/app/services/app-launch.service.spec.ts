import { TestBed } from '@angular/core/testing';

import { AppLaunchService } from './app-launch.service';

describe('AppLaunchService', () => {
  let service: AppLaunchService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AppLaunchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
