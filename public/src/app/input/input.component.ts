import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent implements OnInit {
  @Input() changePlayerInfo: any
  @Input() player: any
  @Input() placeholder: string = ''
  @Input() version: boolean = false
  @Input() type: string = ''
  @Input() value: string = ''
  valueChange(value: any) {
    this.changePlayerInfo(value, this.player ? this.player : this.type)
  }
  constructor() { }

  ngOnInit(): void {
  }

}
