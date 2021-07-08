import { __decorate } from "tslib";
import { Component } from '@angular/core';
let HeaderComponent = class HeaderComponent {
    constructor(router, avatarsService, playerInfoService) {
        this.router = router;
        this.avatarsService = avatarsService;
        this.playerInfoService = playerInfoService;
        this.avatars = [];
        this.avatarsService.getAvatars()
            .subscribe(val => {
            this.avatars = [...val.data];
            this.avatarsService.setAvatars([...val.data]);
        });
        this.playerInfo = this.playerInfoService.get_player_info();
    }
    ngOnInit() { }
    choosePlayer() {
        this.router.navigate(['choose-player']);
    }
    stats() {
        this.router.navigate(['stats']);
    }
    startGame() {
        let flag = 0;
        let player1 = '';
        let player2 = '';
        let avatars = [...this.avatarsService.getStaticAvatars()];
        avatars.forEach((item, i) => {
            if (item.selected) {
                if (item.player === '1') {
                    player1 = item.id;
                }
                else {
                    player2 = item.id;
                }
                flag++;
            }
        });
        if (flag === 2) {
            const queryParams = {
                player1,
                player2
            };
            this.router.navigate([`play-game`, queryParams]);
        }
        else {
            alert('Please select both Avatars');
        }
    }
};
HeaderComponent = __decorate([
    Component({
        selector: 'app-header',
        templateUrl: './header.component.html',
        styleUrls: ['./header.component.scss']
    })
], HeaderComponent);
export { HeaderComponent };
//# sourceMappingURL=header.component.js.map