import { __decorate } from "tslib";
import { Component, Input } from '@angular/core';
let PaginationComponent = class PaginationComponent {
    constructor() {
        this.data = [];
        this.params = {
            total: 0,
            active: 1,
            pages: 0,
            limit: 6
        };
    }
    ngOnChanges(changes) {
        const { currentValue, previousValue } = changes.data;
        if (((!!previousValue) && (!!currentValue))) {
            if (currentValue.length !== previousValue.length) {
                let total = currentValue.length;
                let pages = currentValue.length > this.params.limit ? Math.ceil(total / this.params.limit) : 1;
                this.params.total = total;
                this.params.active = 1;
                this.params.pages = pages;
                this.paginate_data(Object.assign({}, this.params));
            }
        }
    }
    change_active(info, type) {
        if (!!info) {
            this.paginate_data(Object.assign(Object.assign({}, this.params), { active: info }));
            this.params.active = info;
        }
        else if (type === "prev") {
            if (this.params.active !== 1) {
                this.paginate_data(Object.assign(Object.assign({}, this.params), { active: this.params.active - 1 }));
                this.params.active = this.params.active - 1;
            }
        }
        else if (this.params.active !== this.params.pages) {
            this.paginate_data(Object.assign(Object.assign({}, this.params), { active: this.params.active + 1 }));
            this.params.active = this.params.active + 1;
        }
    }
};
__decorate([
    Input()
], PaginationComponent.prototype, "data", void 0);
__decorate([
    Input()
], PaginationComponent.prototype, "paginate_data", void 0);
PaginationComponent = __decorate([
    Component({
        selector: 'app-pagination',
        templateUrl: './pagination.component.html',
        styleUrls: ['./pagination.component.scss']
    })
], PaginationComponent);
export { PaginationComponent };
//# sourceMappingURL=pagination.component.js.map