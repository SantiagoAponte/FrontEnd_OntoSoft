/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ClinicHistoryService } from './clinicHistory.service';

describe('Service: ClinicHistory', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ClinicHistoryService]
    });
  });

  it('should ...', inject([ClinicHistoryService], (service: ClinicHistoryService) => {
    expect(service).toBeTruthy();
  }));
});
