import { TestBed } from '@angular/core/testing';

import { ModsService } from './mods.service';

describe('ModsService', () => {
  let service: ModsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ModsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
