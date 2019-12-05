import { TestBed } from '@angular/core/testing';

import { RestApisService } from './rest-apis.service';

describe('RestApisService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RestApisService = TestBed.get(RestApisService);
    expect(service).toBeTruthy();
  });
});
