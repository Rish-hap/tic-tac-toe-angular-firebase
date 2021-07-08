import { TestBed } from '@angular/core/testing';
import { CanActivateGuardService } from './can-activate-guard.service';
describe('CanActivateGuardService', () => {
    let service;
    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(CanActivateGuardService);
    });
    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
//# sourceMappingURL=can-activate-guard.service.spec.js.map