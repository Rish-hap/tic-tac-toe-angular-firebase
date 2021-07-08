import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router"
import { TossService } from '../services/toss.service';
import { AvatarsServiceService } from '../services/avatars-service.service';
import { Router } from '@angular/router';
import { GamesInfoService } from '../services/games-info.service';
import { PlayerInfoService } from '../services/player-info.service';
import { Game } from "../model/game.model"



function confirmMove(message: string): any {
  return function (target: object, key: string | symbol, descriptor: PropertyDescriptor) {
    const original = descriptor.value;

    descriptor.value = function (...args: any) {
      let flag = confirm(message)
      if (flag) {
        return original.apply(this, args)
      } else {
        return null
      }
    }
    return descriptor
  }
}


@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {
  avatars: { src: string, id: number, name: string, selected: boolean, player: string }[] = []
  squares: any[] = [null, null, null, null, null, null, null, null, null]
  player1: string = ''
  player2: string = ''
  xIsNext: boolean = true;
  coinFlip: boolean = false;
  winner: 'X' | 'O' | false = 'X';
  moves: number = 0
  timing: { start: any, end: any } = { start: null, end: null }

  playerInfo: {
    1: {
      name: string,
      avatar: string
    },
    2: {
      name: string,
      avatar: string
    }
  } = {
      1: {
        name: '',
        avatar: ''
      },
      2: {
        name: '',
        avatar: ''
      }
    }

  gameInfo: Game = {
    player1: {
      name: '',
      avatar: '',
      moves: 0,
      time: 0
    },
    player2: {
      name: '',
      avatar: '',
      moves: 0,
      time: 0
    },
    Time: 0,
    won: '',
    _id: ''
  }

  constructor(private Toss_service: TossService, private route: ActivatedRoute, private avatarsService: AvatarsServiceService, private router: Router,
    private gamesInfoService: GamesInfoService, private playerInfoService: PlayerInfoService) {
    this.avatarsService.getAvatars()
      .subscribe(val => {
        this.avatars = [...val.data]
        this.route.params.subscribe(params => {
          if (params.player1 === params.player2) {
            this.router.navigate(['choose-player'])
          } else {
            let arr = [...this.avatars]
            let new_arr = arr.map((item: any) => {
              if (item.id.toString() === params.player1) {
                this.player1 = item.src
                this.gameInfo.player1.name = item.name
                this.gameInfo.player1.avatar = item.src
                return {
                  ...item,
                  selected: true,
                  player: '1'
                }
              } else if (item.id.toString() === params.player2) {
                this.player2 = item.src
                this.gameInfo.player2.name = item.name
                this.gameInfo.player2.avatar = item.src
                return {
                  ...item,
                  selected: true,
                  player: '2'
                }
              } else {
                return {
                  ...item,
                  selected: false,
                  player: ''
                }
              }
            })
            this.avatarsService.setAvatars([...new_arr])
          }
        })
      })
  }

  ngOnInit(): void {
    this.newGame()
    this.playerInfo = this.playerInfoService.get_player_info()
  }

  getTurn(): void {
    this.xIsNext = this.Toss_service.flip_coin() === 'H'
    setTimeout(() => {
      this.coinFlip = true
      this.timing.start = new Date()
    }, 500)
  }

  newGame(): void {
    this.squares = Array(9).fill(null)
    this.winner = false
    this.xIsNext = true
    this.coinFlip = false
    this.timing = { start: null, end: null }
    this.moves = 0
    this.gameInfo = {
      player1: {
        name: '',
        avatar: '',
        moves: 0,
        time: 0
      },
      player2: {
        name: '',
        avatar: '',
        moves: 0,
        time: 0
      },
      Time: 0,
      won: '',
      _id: ''
    }

  }

  get player(): string {
    return this.xIsNext ? 'O' : 'X'
  }

  // @confirmMove("Are you sure about this move?")
  makeMove(idx: number) {
    console.log(this.moves, "polo")
    if (!this.squares[idx] && !this.winner && this.coinFlip && this.moves !== 9) {
      this.squares.splice(idx, 1, this.player)
      this.squares = [...this.squares]
      this.xIsNext = !this.xIsNext
      this.moves++
      this.winner = this.calculateWinner()
    }
  }

  update_avatars_stats(winner: string): void {
    if (winner !== "None") {
      let player_won = winner === 'O' ? this.player1 : this.player2
      let player_loss = winner === 'O' ? this.player2 : this.player1

      let arr = [...this.avatars]

      let updated_avatars = arr.map((item: any, i: any) => {
        if (item.src === player_won) {
          return {
            ...item,
            wins: item.wins + 1,
          }
        } else if (item.src === player_loss) {
          return {
            ...item,
            loss: item.loss + 1,
          }
        } else {
          return item
        }
      })
      this.avatarsService.setAvatars([...updated_avatars])
    }
  }

  getDifferenceInSeconds = (date1: any, date2: any): number => {
    if (!date1) {
      let diffInMs = Math.abs(date2 - this.timing.start);
      return diffInMs / 1000
    } else {
      let diffInMs = Math.abs(date2 - date1);
      return diffInMs / 1000;
    }
  }

  update_game_info = (): any => {

    this.playerInfo = this.playerInfoService.get_player_info()

    let activePlayer = !this.xIsNext ? 'player1' : 'player2'

    this.gameInfo.player1 = { ...this.gameInfo.player1, ...this.playerInfo[1] }
    this.gameInfo.player2 = { ...this.gameInfo.player2, ...this.playerInfo[2] }

    if (activePlayer === 'player1') {
      this.gameInfo.player1.moves = this.gameInfo.player1.moves + 1
      this.gameInfo.player1.time = this.gameInfo.player1.time + this.getDifferenceInSeconds(this.timing.end, new Date())
      this.timing.end = new Date()
    } else {
      this.gameInfo.player2.moves = this.gameInfo.player2.moves + 1
      this.gameInfo.player2.time = this.gameInfo.player2.time + this.getDifferenceInSeconds(this.timing.end, new Date())
      this.timing.end = new Date()
    }
  }

  calculateWinner() {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ]

    this.update_game_info()
    console.log(this.moves, "moves")
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i]
      let result = (this.squares[a] && this.squares[a] === this.squares[b] && this.squares[a] === this.squares[c])
      if (result || (this.moves === 9)) {
        this.timing.end = new Date()
        this.update_avatars_stats(result ? this.squares[a] : 'None')
        this.gamesInfoService.setGamesInfo({ ...this.gameInfo, Time: (new Date()).toString(), _id: '', won: result ? !this.xIsNext ? 'player1' : 'player2' : "None" })
        return result ? this.squares[a] : false
      }
    }
    return false
  }
}
