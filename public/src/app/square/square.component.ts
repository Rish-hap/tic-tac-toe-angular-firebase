import { Component, Input, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-square',
  templateUrl: './square.component.html',
  styleUrls: ['./square.component.scss'],
  inputs: ['valuefromParent']
})
export class SquareComponent {
  @Input() valuefromParent: any
  @Input() player1: any
  @Input() player2: any


  ngOnInit(): void {

  }

  ngOnChanges(changes: SimpleChanges) {

  }
}

