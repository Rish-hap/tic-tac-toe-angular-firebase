import { Component, OnInit, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnChanges {
  @Input() data: any[] = []
  @Input() paginate_data: any
  params: { total: number, active: number, pages: number, limit: number } = {
    total: 0,
    active: 1,
    pages: 1,
    limit: 4
  }
  constructor() { }

  ngOnChanges(changes: any): void {
    const { currentValue, previousValue } = changes.data

    if (((!!previousValue) && (!!currentValue))) {
      if (currentValue.length !== previousValue.length) {
        let total = currentValue.length
        let pages = currentValue.length > this.params.limit ? Math.ceil(total / this.params.limit) : 1
        this.params.total = total
        this.params.active = 1
        this.params.pages = pages
        this.paginate_data({ ...this.params })
      }
    }
  }

  change_active(info: any, type: string) {
    if (!!info) {
      this.paginate_data({ ...this.params, active: info })
      this.params.active = info
    } else if (type === "prev") {
      if (this.params.active !== 1) {
        this.paginate_data({ ...this.params, active: this.params.active - 1 })
        this.params.active = this.params.active - 1
      }
    } else
      if (this.params.active !== this.params.pages) {
        this.paginate_data({ ...this.params, active: this.params.active + 1 })
        this.params.active = this.params.active + 1
      }
  }
}
