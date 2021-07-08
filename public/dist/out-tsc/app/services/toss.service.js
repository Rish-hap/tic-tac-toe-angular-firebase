import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
let TossService = class TossService {
    constructor() { }
    flip_coin() {
        let x = (Math.floor(Math.random() * 2) === 0);
        if (x) {
            return "T";
        }
        else {
            return 'H';
        }
    }
};
TossService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], TossService);
export { TossService };
//# sourceMappingURL=toss.service.js.map