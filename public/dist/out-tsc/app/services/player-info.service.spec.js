import { TestBed } from '@angular/core/testing';
import { PlayerInfoService } from './player-info.service';
describe('PlayerInfoService', () => {
    let service;
    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(PlayerInfoService);
    });
    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
//# sourceMappingURL=player-info.service.spec.js.map