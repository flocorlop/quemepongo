import { TestBed } from '@angular/core/testing';

import { OutfitsService } from './outfits.service';

describe('OutfitsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OutfitsService = TestBed.get(OutfitsService);
    expect(service).toBeTruthy();
  });
});
