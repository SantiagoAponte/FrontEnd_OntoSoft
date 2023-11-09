/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { OdontogramService } from './odontogram.service';

describe('Service: Odontogram', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OdontogramService]
    });
  });

  it('should ...', inject([OdontogramService], (service: OdontogramService) => {
    expect(service).toBeTruthy();
  }));
});
