import { __decorate } from "tslib";
import { Component } from '@angular/core';
let AvatarStatsComponent = class AvatarStatsComponent {
    constructor(avatarsService, gamesInfoService) {
        this.avatarsService = avatarsService;
        this.gamesInfoService = gamesInfoService;
        this.avatars = [];
        this.gamesInfo = [];
        this.avatarsService.getAvatars()
            .subscribe(val => {
            this.avatars = [...val.data];
        });
        this.gamesInfoService.get_games_info()
            .subscribe(val => {
            this.gamesInfo = [...val.data];
        });
    }
    ngOnInit() {
    }
};
AvatarStatsComponent = __decorate([
    Component({
        selector: 'app-avatar-stats',
        templateUrl: './avatar-stats.component.html',
        styleUrls: ['./avatar-stats.component.scss']
    })
], AvatarStatsComponent);
export { AvatarStatsComponent };
//# sourceMappingURL=avatar-stats.component.js.map