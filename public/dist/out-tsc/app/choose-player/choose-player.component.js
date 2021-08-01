import { __decorate } from "tslib";
import { Component } from '@angular/core';
let ChoosePlayerComponent = class ChoosePlayerComponent {
    constructor(router, avatarsService, playerInfoService) {
        this.router = router;
        this.avatarsService = avatarsService;
        this.playerInfoService = playerInfoService;
        this.avatars = [];
        this.changePlayerInfo = (value, player, src) => {
            let info = this.playerInfo;
            info[player].name = value;
            this.playerInfoService.set_player_info(Object.assign({}, info));
        };
        this.selectPlayer = (...args) => {
            let { item, player } = { item: args[0], player: args[1] };
            let info = this.playerInfo;
            info[parseInt(player, 10)].avatar = item.src;
            this.playerInfoService.set_player_info(Object.assign({}, info));
            let arr = [...this.avatars];
            let new_arr = arr.map((avatar, i) => {
                if (avatar.id == item.id) {
                    return Object.assign(Object.assign({}, item), { selected: true, player: player });
                }
                else if (avatar.player !== '') {
                    return Object.assign(Object.assign({}, avatar), { selected: avatar.player === player ? false : true, player: avatar.player !== player ? player === '1' ? '2' : '1' : '' });
                }
                else {
                    return Object.assign({}, avatar);
                }
            });
            this.avatars = [...new_arr];
            this.avatarsService.setAvatars([...new_arr]);
        };
        this.avatarsService.getAvatars()
            .subscribe(val => {
            this.avatars = [...val.data];
            let players = this.avatars.filter((item) => item.selected);
            let info = {
                1: {
                    name: '',
                    avatar: ''
                },
                2: {
                    name: '',
                    avatar: ''
                }
            };
            players.forEach((element) => {
                if (element.player === '1') {
                    info[1].avatar = element.src;
                }
                else if (element.player === '2') {
                    info[2].avatar = element.src;
                }
            });
            this.playerInfoService.set_player_info(Object.assign({}, info));
            this.playerInfo = Object.assign({}, info);
        });
    }
    ngOnInit() { }
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
ChoosePlayerComponent = __decorate([
    Component({
        selector: 'app-choose-player',
        templateUrl: './choose-player.component.html',
        styleUrls: ['./choose-player.component.scss']
    })
], ChoosePlayerComponent);
export { ChoosePlayerComponent };
//# sourceMappingURL=choose-player.component.js.map