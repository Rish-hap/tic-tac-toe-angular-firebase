import { TestBed } from '@angular/core/testing';
import { AvatarsServiceService } from './avatars-service.service';
describe('AvatarsServiceService', () => {
    let service;
    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(AvatarsServiceService);
    });
    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
//# sourceMappingURL=avatars-service.service.spec.js.map