import { Injectable } from '@angular/core';
import { CanActivate } from "@angular/router";
import { PlayerInfoService } from './player-info.service';

@Injectable({
  providedIn: 'root'
})
export class CanActivateGuardService implements CanActivate {
  playerInfo: any
  canActivate() {
    this.playerInfo = this.playerInfoService.get_player_info()
    console.log(this.playerInfo, "playerInfo")
    if (this.playerInfo[1].name === "") {
      alert("Please choose player 1 name")
      return false
    } else if (this.playerInfo[2].name === "") {
      alert("Please choose player 2 name")
      return false
    } else if (this.playerInfo[1].name === this.playerInfo[2].name) {
      alert("Both players cannot have same name")
      return false
    }
    return true;
  }
  constructor(private playerInfoService: PlayerInfoService) {
    this.playerInfo = this.playerInfoService.get_player_info()
  }
}
