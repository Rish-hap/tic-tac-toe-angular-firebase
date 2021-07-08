import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
let PlayerInfoService = class PlayerInfoService {
    constructor() {
        this.player_info = {
            1: {
                name: '',
                avatar: ''
            },
            2: {
                name: '',
                avatar: ''
            }
        };
    }
    get_player_info() {
        return this.player_info;
    }
    set_player_info(info) {
        this.player_info = Object.assign({}, info);
    }
};
PlayerInfoService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], PlayerInfoService);
export { PlayerInfoService };
//# sourceMappingURL=player-info.service.js.map