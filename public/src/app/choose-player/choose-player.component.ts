import { Component, OnInit } from '@angular/core';
import { AvatarsServiceService } from '../services/avatars-service.service';
import { PlayerInfoService } from '../services/player-info.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-choose-player',
  templateUrl: './choose-player.component.html',
  styleUrls: ['./choose-player.component.scss']
})
export class ChoosePlayerComponent implements OnInit {
  avatars: { src: string, id: number, name: string, selected: boolean, player: string }[] = []
  playerInfo: any

  constructor(private router: Router, private avatarsService: AvatarsServiceService, private playerInfoService: PlayerInfoService) {
    this.avatarsService.getAvatars()
      .subscribe(val => {
        this.avatars = [...val.data]
        let players = this.avatars.filter((item: any) => item.selected)
        let info = {
          1: {
            name: '',
            avatar: ''
          },
          2: {
            name: '',
            avatar: ''
          }
        }
        players.forEach((element: any) => {
          if (element.player === '1') {
            info[1].avatar = element.src
          } else if (element.player === '2') {
            info[2].avatar = element.src
          }
        })
        this.playerInfoService.set_player_info({ ...info })
        this.playerInfo = { ...info }
      })
  }

  ngOnInit(): void { }

  changePlayerInfo = (value: string, player: number, src: string): void => {
    let info = this.playerInfo
    info[player].name = value
    this.playerInfoService.set_player_info({ ...info })
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

  selectPlayer = (...args: any): void => {
    let { item, player } = { item: args[0], player: args[1] }
    let info = this.playerInfo
    info[parseInt(player, 10)].avatar = item.src
    this.playerInfoService.set_player_info({ ...info })
    let arr = [...this.avatars]

    let new_arr = arr.map((avatar: { src: string, id: number, name: string, selected: boolean, player: string }, i) => {
      if (avatar.id == item.id) {
        return {
          ...item,
          selected: true,
          player: player
        }
      } else if (avatar.player !== '') {
        return {
          ...avatar,
          selected: avatar.player === player ? false : true,
          player: avatar.player !== player ? player === '1' ? '2' : '1' : ''
        }
      } else {
        return {
          ...avatar
        }
      }
    })
    this.avatars = [...new_arr]
    this.avatarsService.setAvatars([...new_arr])
  }

}
