import { TestBed } from '@angular/core/testing';

import { AccountMasterService } from './account-master.service';

describe('AccountMasterService', () => {
  let service: AccountMasterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AccountMasterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
