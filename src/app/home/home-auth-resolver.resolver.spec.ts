import { TestBed } from '@angular/core/testing';

import { HomeAuthResolverResolver } from './home-auth-resolver.resolver';

describe('HomeAuthResolverResolver', () => {
  let resolver: HomeAuthResolverResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(HomeAuthResolverResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
