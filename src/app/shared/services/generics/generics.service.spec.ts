/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { GenericsService } from './generics.service';

describe('Service: Generics', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GenericsService]
    });
  });

  it('should ...', inject([GenericsService], (service: GenericsService) => {
    expect(service).toBeTruthy();
  }));
});
