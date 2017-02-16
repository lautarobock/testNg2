/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SessionHttpService } from './session-http.service';

describe('SessionHttpService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SessionHttpService]
    });
  });

  it('should ...', inject([SessionHttpService], (service: SessionHttpService) => {
    expect(service).toBeTruthy();
  }));
});
