import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
let CanActivateGuardService = class CanActivateGuardService {
    constructor(playerInfoService) {
        this.playerInfoService = playerInfoService;
        this.playerInfo = this.playerInfoService.get_player_info();
    }
    canActivate() {
        this.playerInfo = this.playerInfoService.get_player_info();
        console.log(this.playerInfo, "playerInfo");
        if (this.playerInfo[1].name === "") {
            alert("Please choose player 1 name");
            return false;
        }
        else if (this.playerInfo[2].name === "") {
            alert("Please choose player 2 name");
            return false;
        }
        else if (this.playerInfo[1].name === this.playerInfo[2].name) {
            alert("Both players cannot have same name");
            return false;
        }
        return true;
    }
};
CanActivateGuardService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], CanActivateGuardService);
export { CanActivateGuardService };
//# sourceMappingURL=can-activate-guard.service.js.map