import { __decorate } from "tslib";
import { Pipe } from '@angular/core';
let DatePipePipe = class DatePipePipe {
    get_date_format(date) {
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(date).toLocaleDateString('de-DE');
    }
    transform(value, ...args) {
        let time = this.get_date_format(value);
        return time;
    }
};
DatePipePipe = __decorate([
    Pipe({
        name: 'datePipe'
    })
], DatePipePipe);
export { DatePipePipe };
//# sourceMappingURL=date-pipe.pipe.js.map