import { TestBed } from '@angular/core/testing';

import { SitioService } from './sitio.service';

describe('SitioService', () => {
  let service: SitioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SitioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
