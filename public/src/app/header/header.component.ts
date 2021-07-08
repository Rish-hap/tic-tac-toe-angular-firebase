import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AvatarsServiceService } from '../services/avatars-service.service';
import { PlayerInfoService } from '../services/player-info.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  avatars: { src: string, id: number, name: string, selected: boolean, player: string, wins: number, loss: number }[] = []
  playerInfo: any

  constructor(private router: Router, private avatarsService: AvatarsServiceService, private playerInfoService: PlayerInfoService) {
    this.avatarsService.getAvatars()
      .subscribe(val => {
        this.avatars = [...val.data]
        this.avatarsService.setAvatars([...val.data])
      })
    this.playerInfo = this.playerInfoService.get_player_info()
  }

  ngOnInit(): void { }

  choosePlayer() {
    this.router.navigate(['choose-player'])
  }

  stats() {
    this.router.navigate(['stats'])
  }
  startGame() {
    let flag = 0
    let player1 = ''
    let player2 = ''
    let avatars = [...this.avatarsService.getStaticAvatars()]

    avatars.forEach((item: any, i: number) => {
      if (item.selected) {
        if (item.player === '1') {
          player1 = item.id
        } else {
          player2 = item.id
        }
        flag++
      }
    })
    if (flag === 2) {
      const queryParams = {
        player1,
        player2
      }
      this.router.navigate([`play-game`, queryParams])
    } else {
      alert('Please select both Avatars')
    }

  }

}
