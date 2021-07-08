import { Component, OnInit, Input } from '@angular/core';
import { avatars } from 'src/app/utils/avatars';
import { Avatar } from 'src/app/model/avatar.model';

@Component({
  selector: 'app-table-header',
  templateUrl: './table-header.component.html',
  styleUrls: ['./table-header.component.scss']
})
export class TableHeaderComponent implements OnInit {
  
  @Input() player1:string = ''
  @Input() player2:string = ''
  @Input() avatar1:string = ''
  @Input() avatar2:string = ''
  @Input() search: (args: any) => void = ()=> {}
  @Input() avatars: Avatar[]   = avatars

  constructor() {}

  ngOnInit(): void {
  }

  avatarChange = (args:any): void => {
    const { term, type }  = args
    type==='avatar1'?this.avatar1 = term:this.avatar2 = term
    console.log(type,'term in avatarChange')
    this.search({ type:'search', player1:this.player1, player2:this.player2, avatar1:this.avatar1, avatar2:this.avatar2 })
  }

  playerNameChange = (args:any):void =>{

    const { term, type }  = args
    type==='player1'?this.player1 = term:this.player2 = term
    this.search({ type:'search', player1:this.player1, player2:this.player2, avatar1:this.avatar1, avatar2:this.avatar2  })

  }

  filterClick(){
    let element = document.getElementById('filter-date')
    element?.focus()
    element?.click()
  }

}
