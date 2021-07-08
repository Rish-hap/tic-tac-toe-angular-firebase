import { __decorate } from "tslib";
import { Component, Input } from '@angular/core';
let SquareComponent = class SquareComponent {
    ngOnInit() {
    }
    ngOnChanges(changes) {
    }
};
__decorate([
    Input()
], SquareComponent.prototype, "valuefromParent", void 0);
__decorate([
    Input()
], SquareComponent.prototype, "player1", void 0);
__decorate([
    Input()
], SquareComponent.prototype, "player2", void 0);
SquareComponent = __decorate([
    Component({
        selector: 'app-square',
        templateUrl: './square.component.html',
        styleUrls: ['./square.component.scss'],
        inputs: ['valuefromParent']
    })
], SquareComponent);
export { SquareComponent };
//# sourceMappingURL=square.component.js.map