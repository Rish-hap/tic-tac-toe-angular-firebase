import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PlayerInfoService {
  player_info: any = {
    1: {
      name: '',
      avatar: ''
    },
    2: {
      name: '',
      avatar: ''
    }
  }
  constructor() { }

  get_player_info() {
    return this.player_info
  }

  set_player_info(info: any) {
    this.player_info = { ...info }
  }
}
