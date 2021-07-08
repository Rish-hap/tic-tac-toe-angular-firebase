import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'datePipe'
})
export class DatePipePipe implements PipeTransform {

  get_date_format(date:any) {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(date).toLocaleDateString('de-DE')
  }

  transform(value: unknown, ...args: unknown[]): unknown {
    let time = this.get_date_format(value)
    return time;
  }

}
