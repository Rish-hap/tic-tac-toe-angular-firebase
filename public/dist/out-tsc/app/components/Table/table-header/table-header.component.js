import { __decorate } from "tslib";
import { Component } from '@angular/core';
let TableHeaderComponent = class TableHeaderComponent {
    constructor() { }
    ngOnInit() {
    }
    filterClick() {
        let element = document.getElementById('filter-date');
        console.log(element, "element in filterClick");
        element === null || element === void 0 ? void 0 : element.focus();
        element === null || element === void 0 ? void 0 : element.click();
    }
};
TableHeaderComponent = __decorate([
    Component({
        selector: 'app-table-header',
        templateUrl: './table-header.component.html',
        styleUrls: ['./table-header.component.scss']
    })
], TableHeaderComponent);
export { TableHeaderComponent };
//# sourceMappingURL=table-header.component.js.map