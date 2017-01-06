/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { HierarchyService } from './hierarchy.service';

describe('HierarchyService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HierarchyService]
    });
  });

  it('should ...', inject([HierarchyService], (service: HierarchyService) => {
    expect(service).toBeTruthy();
  }));
});
