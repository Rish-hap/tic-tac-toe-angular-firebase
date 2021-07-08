import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit {
  @Input() data: any
  @Input() player: any
  @Input() selectPlayer: any
  @Input() changePlayerInfo: any
  constructor() { }

  ngOnInit(): void {
  }

}
