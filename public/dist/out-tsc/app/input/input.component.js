import { __decorate } from "tslib";
import { Component, Input } from '@angular/core';
let InputComponent = class InputComponent {
    constructor() {
        this.value = '';
    }
    valueChange(value) {
        this.changePlayerInfo(value, this.player);
    }
    ngOnInit() {
    }
};
__decorate([
    Input()
], InputComponent.prototype, "changePlayerInfo", void 0);
__decorate([
    Input()
], InputComponent.prototype, "player", void 0);
InputComponent = __decorate([
    Component({
        selector: 'app-input',
        templateUrl: './input.component.html',
        styleUrls: ['./input.component.scss']
    })
], InputComponent);
export { InputComponent };
//# sourceMappingURL=input.component.js.map