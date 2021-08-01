import { __decorate } from "tslib";
import { Component, Input } from '@angular/core';
import { avatars } from 'src/app/utils/avatars';
let TableHeaderComponent = class TableHeaderComponent {
    constructor() {
        this.player1 = '';
        this.player2 = '';
        this.avatar1 = '';
        this.avatar2 = '';
        this.search = () => { };
        this.avatars = avatars;
        this.avatarChange = (args) => {
            const { term, type } = args;
            type === 'avatar1' ? this.avatar1 = term : this.avatar2 = term;
            console.log(type, 'term in avatarChange');
            this.search({ type: 'search', player1: this.player1, player2: this.player2, avatar1: this.avatar1, avatar2: this.avatar2 });
        };
        this.playerNameChange = (args) => {
            const { term, type } = args;
            type === 'player1' ? this.player1 = term : this.player2 = term;
            this.search({ type: 'search', player1: this.player1, player2: this.player2, avatar1: this.avatar1, avatar2: this.avatar2 });
        };
    }
    ngOnInit() {
    }
    filterClick() {
        let element = document.getElementById('filter-date');
        element === null || element === void 0 ? void 0 : element.focus();
        element === null || element === void 0 ? void 0 : element.click();
    }
};
__decorate([
    Input()
], TableHeaderComponent.prototype, "player1", void 0);
__decorate([
    Input()
], TableHeaderComponent.prototype, "player2", void 0);
__decorate([
    Input()
], TableHeaderComponent.prototype, "avatar1", void 0);
__decorate([
    Input()
], TableHeaderComponent.prototype, "avatar2", void 0);
__decorate([
    Input()
], TableHeaderComponent.prototype, "search", void 0);
__decorate([
    Input()
], TableHeaderComponent.prototype, "avatars", void 0);
TableHeaderComponent = __decorate([
    Component({
        selector: 'app-table-header',
        templateUrl: './table-header.component.html',
        styleUrls: ['./table-header.component.scss']
    })
], TableHeaderComponent);
export { TableHeaderComponent };
//# sourceMappingURL=table-header.component.js.map