import { __decorate } from "tslib";
import { Component, Input } from '@angular/core';
let PlayerComponent = class PlayerComponent {
    constructor() { }
    ngOnInit() {
    }
};
__decorate([
    Input()
], PlayerComponent.prototype, "data", void 0);
__decorate([
    Input()
], PlayerComponent.prototype, "player", void 0);
__decorate([
    Input()
], PlayerComponent.prototype, "selectPlayer", void 0);
__decorate([
    Input()
], PlayerComponent.prototype, "changePlayerInfo", void 0);
PlayerComponent = __decorate([
    Component({
        selector: 'app-player',
        templateUrl: './player.component.html',
        styleUrls: ['./player.component.scss']
    })
], PlayerComponent);
export { PlayerComponent };
//# sourceMappingURL=player.component.js.map