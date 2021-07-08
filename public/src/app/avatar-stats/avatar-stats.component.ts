import { Component, OnInit } from '@angular/core';
import { AvatarsServiceService } from '../services/avatars-service.service';
import { GamesInfoService } from "../services/games-info.service"

@Component({
  selector: 'app-avatar-stats',
  templateUrl: './avatar-stats.component.html',
  styleUrls: ['./avatar-stats.component.scss']
})
export class AvatarStatsComponent implements OnInit {
  avatars: { src: string, id: number, name: string, selected: boolean, player: string, wins: number, loss: number }[] = []
  gamesInfo: any[] = []

  constructor(private avatarsService: AvatarsServiceService, private gamesInfoService: GamesInfoService) {
    this.avatarsService.getAvatars()
      .subscribe(val => {
        this.avatars = [...val.data]
      })
    this.gamesInfoService.get_games_info()
      .subscribe(val => {
        this.gamesInfo = [...val.data]
      })
  }

  ngOnInit(): void {
  }

}
