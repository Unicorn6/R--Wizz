import { TestBed, inject } from '@angular/core/testing';

import { IpinfoService } from './ipinfo.service';

describe('IpinfoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [IpinfoService]
    });
  });

  it('should be created', inject([IpinfoService], (service: IpinfoService) => {
    expect(service).toBeTruthy();
  }));
});
