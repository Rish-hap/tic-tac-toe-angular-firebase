import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import axios from 'axios';
import { url } from '../utils/url';
let GamesInfoService = class GamesInfoService {
    constructor() {
        this.gamesInfo = [];
    }
    get_games_info(data) {
        console.log(data, "someData in get_games_info");
        console.log(this.gamesInfo, "this.gameInfo in get_games_info");
        return new Observable((observer) => {
            if (this.gamesInfo.length === 0) {
                (async () => {
                    let data = await axios.get(`${url}/games/allGames`, {
                        headers: {
                            auth_header: 'no'
                        }
                    })
                        .then((res) => {
                        return res.data;
                    })
                        .catch((err) => {
                        return {
                            success: false,
                            message: "Unable to fetch Games"
                        };
                    });
                    observer.next(data);
                })();
            }
            else {
                observer.next({
                    data: [...this.gamesInfo]
                });
            }
        });
    }
    async set_games_info_backend(games) {
        console.log(games, "games in set_games_info_backend");
        let data = {};
        try {
            data = await axios.post(`${url}/games/addGame`, {
                games: games
            })
                .then((res) => {
                return res.data;
            })
                .catch((err) => {
                return {
                    success: false,
                    message: "Unable to fetch avatars"
                };
            });
        }
        catch (error) {
            data = {
                success: false,
                message: "Unable to fetch avatars"
            };
        }
        return data;
    }
    getStaticGames() {
        return [...this.gamesInfo];
    }
    setGamesInfo(data) {
        let games = this.getStaticGames();
        console.log(games, "games in setGamesInfo");
        console.log(data, "data in setGamesInfo");
        games.push(data);
        // this.gamesInfo = [...games]
        this.set_games_info_backend(data);
    }
};
GamesInfoService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], GamesInfoService);
export { GamesInfoService };
//# sourceMappingURL=games-info.service.js.map