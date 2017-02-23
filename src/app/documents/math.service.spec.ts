/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { MathService } from './math.service';

xdescribe('MathService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MathService]
    });
  });

  it('should ...', inject([MathService], (service: MathService) => {
    expect(service).toBeTruthy();
  }));
});
