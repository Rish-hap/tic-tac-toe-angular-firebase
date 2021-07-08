import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent implements OnInit {
  @Input() changePlayerInfo: any
  @Input() player: any
  value: string = ''
  valueChange(value: any) {
    this.changePlayerInfo(value, this.player)
  }
  constructor() { }

  ngOnInit(): void {
  }

}
