import { TestBed } from '@angular/core/testing';
import { SearchClientService } from './search-client.service';
describe('SearchClientService', () => {
    let service;
    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(SearchClientService);
    });
    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
//# sourceMappingURL=search-client.service.spec.js.map