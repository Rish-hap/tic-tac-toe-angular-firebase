import { __decorate } from "tslib";
import { Pipe } from '@angular/core';
let TimeInSecPipePipe = class TimeInSecPipePipe {
    getDifferenceInSeconds(date1, date2) {
        const diffInMs = Math.abs(date2 - date1);
        return diffInMs / 1000;
    }
    transform(value, ...args) {
        let seconds = this.getDifferenceInSeconds(value.start, value.end);
        return seconds;
    }
};
TimeInSecPipePipe = __decorate([
    Pipe({
        name: 'timeInSecPipe'
    })
], TimeInSecPipePipe);
export { TimeInSecPipePipe };
//# sourceMappingURL=time-in-sec-pipe.pipe.js.map