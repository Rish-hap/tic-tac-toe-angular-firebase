import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import axios from 'axios'
import { url } from '../utils/url';
import { Game } from '../model/game.model';

@Injectable({
  providedIn: 'root'
})
export class GamesInfoService {
  gamesInfo: any[] = []
  constructor() { }

  get_games_info(data?: any): Observable<any> {
    console.log(data, "someData in get_games_info")
    console.log(this.gamesInfo, "this.gameInfo in get_games_info")
    return new Observable(
      (observer: any) => {
        if (this.gamesInfo.length === 0) {
          (async () => {
            let data = await axios.get(`${url}/games/allGames`, {
              headers: {
                'x-access-token': localStorage.getItem('token')
              }
            })
              .then((res) => {
                return res.data
              })
              .catch((err) => {
                return {
                  success: false,
                  message: "Unable to fetch Games"
                }
              })
            observer.next(data)
          })()
        } else {
          observer.next({
            data: [...this.gamesInfo]
          })
        }
      }
    );
  }


  async set_games_info_backend(games: Game) {
    console.log(games, "games in set_games_info_backend")
    let data: any = {}
    try {
      data = await axios.post(`${url}/games/addGame`, {
        games: games
      }, {
        headers: {
          'x-access-token': localStorage.getItem('token')
        }
      })
        .then((res) => {
          return res.data;
        })
        .catch((err) => {
          return {
            success: false,
            message: "Unable to fetch avatars"
          }
        });
    } catch (error) {
      data = {
        success: false,
        message: "Unable to fetch avatars"
      }
    }
    return data
  }

  getStaticGames() {
    return [...this.gamesInfo]
  }

  setGamesInfo(data: any) {
    let games = this.getStaticGames()
    console.log(games, "games in setGamesInfo")
    console.log(data, "data in setGamesInfo")
    games.push(data)
    // this.gamesInfo = [...games]
    this.set_games_info_backend(data)
  }
}
