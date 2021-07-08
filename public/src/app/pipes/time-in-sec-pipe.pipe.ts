import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeInSecPipe'
})
export class TimeInSecPipePipe implements PipeTransform {

getDifferenceInSeconds(date1:any, date2:any) {
  const diffInMs = Math.abs(date2 - date1);
  return diffInMs / 1000;
}

  transform(value: {start:null, end:null}, ...args: unknown[]): unknown {
      let seconds = this.getDifferenceInSeconds(value.start, value.end)
    return seconds;
  }

}
