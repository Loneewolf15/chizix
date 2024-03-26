import { TestBed } from '@angular/core/testing';

import { AuthScreenGuard } from './auth-screen.guard';

describe('AuthScreenGuard', () => {
  let guard: AuthScreenGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AuthScreenGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
