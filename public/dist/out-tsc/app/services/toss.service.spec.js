import { TestBed } from '@angular/core/testing';
import { TossService } from './toss.service';
describe('TossService', () => {
    let service;
    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(TossService);
    });
    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
//# sourceMappingURL=toss.service.spec.js.map